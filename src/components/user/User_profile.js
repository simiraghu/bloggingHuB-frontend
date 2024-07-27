import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FaLongArrowAltRight } from "react-icons/fa";
import Button from '@mui/material/Button'
import Spin from '../extras/Spin'
import { useNavigate } from 'react-router-dom';
import { message, Popconfirm } from 'antd';

const User_profile = () => {

    const [user_detail, setUser_detail] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const user = async () => {
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/get_user_by_id`,
                {
                    headers: {
                        'token': token
                    }
                }
            )
            setUser_detail(data?.user)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        user()
    }, [])


    const confirm = async () => {

        const token = localStorage.getItem('token')

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/user/delete_user`, {},
                {
                    headers: {
                        'token': token
                    }
                }
            )
            if (data?.success) {

                message.success(data?.message);
            }

            navigate('/login')
            localStorage.removeItem('token')

        } catch (error) {
            console.log(error)
        }


    };

    const cancel = (e) => {
        console.log(e)
    };

    return (
        <>

            {
                isLoading ?
                    <p>< Spin /></p >
                    :

                    <Box
                        sx={
                            {
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 'auto',
                                    width: '40vw',
                                    height: '50vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '30px'
                                },
                                margin: '5px'
                            }
                        }
                    >
                        <Paper elevation={5}>

                            <Box
                                sx={
                                    {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                    }
                                }

                            >
                                <img
                                    style={
                                        {
                                            borderRadius: '30px'
                                        }
                                    }
                                    src={"https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                                    width='60px'
                                    height='60px'
                                    alt="profile" />


                                <Button
                                    type='submit'
                                    onClick={() => navigate('/change_password')}>change password</Button>

                                <Box
                                    component="section"
                                    sx={
                                        {
                                            p: 2,
                                            border: '1px dashed grey',
                                            width: '30vw',
                                            m: 1
                                        }
                                    }
                                >
                                    User name <FaLongArrowAltRight />  {user_detail?.username}
                                </Box>

                                <Box
                                    component="section"
                                    sx={
                                        {
                                            p: 2,
                                            border: '1px dashed grey',
                                            width: '30vw',
                                            m: 1
                                        }
                                    }
                                >
                                    Email <FaLongArrowAltRight />  {user_detail?.email}
                                </Box>

                                <Box
                                    component="section"
                                    sx={
                                        {
                                            p: 2,
                                            border: '1px dashed grey',
                                            width: '30vw',
                                            m: 1
                                        }
                                    }
                                >
                                    Phone number <FaLongArrowAltRight /> {user_detail?.phonenumber}
                                </Box>

                                <Popconfirm
                                    title="Delete account"
                                    description="Are you sure you want to delete your account?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Delete"
                                    cancelText="Cancel"
                                >
                                    <Button danger>Delete account</Button>
                                </Popconfirm>
                            </Box>
                        </Paper>
                    </Box>
            }
        </>

    )
}

export default User_profile