import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'

export default function SimplePaper() {

    const navigate = useNavigate()

    const [value, setValue] = useState(
        {
            current_password: '',
            new_password: '',
            confirm_password: ''
        }
    )

    const handleOnchange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleOnsubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {

            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/user/change_password`, value,
                {
                    headers: {
                        'token': token
                    }
                }
            )
            if (data?.success) {
                message.success(data?.message)
            }

            navigate('/user_profile')
        } catch (error) {
            message.error(error?.response?.data?.message)
        }

    }


    return (
        <form
         action="" 
         onSubmit={handleOnsubmit}>
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
                        margin: '10px'
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
                        <h4>Change your password</h4>

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Current Password"
                            variant="outlined"
                            type='password'
                            name='current_password'
                            value={value?.current_password}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="New Password"
                            variant="outlined"
                            type='password'
                            name='new_password'
                            value={value?.new_password}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Confirm Password"
                            variant="outlined"
                            type='password'
                            name='confirm_password'
                            value={value?.confirm_password}
                            onChange={(e) => handleOnchange(e)} />

                        <Button type='submit'>Change password</Button>
                    </Box>
                </Paper>
            </Box>
        </form>
    );
}
