import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd';

export default function SimplePaper() {

    const navigate = useNavigate()
    const [value, setValue] = useState(
        {
            username: '',
            email: '',
            phonenumber: '',
            password: ''
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
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/create_user`, value)
            if (data?.success) {
                message.success(data?.message)
            }
            navigate('/login')
            
        } catch (error) {
            console.log(error)
            message.error(error?.response?.data?.message)
        }
    }

    return (
        <form action="" onSubmit={handleOnsubmit}>
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
                            borderRadius:'30px'
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
                        <h4>Welcome to Sign up form!</h4>

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="User Name"
                            variant="outlined"
                            type='text'
                            name='username'
                            required
                            value={value?.username}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Email"
                            variant="outlined"
                            type='email'
                            name='email'
                            required
                            value={value?.email}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Phone Number"
                            variant="outlined"
                            type='number'
                            name='phonenumber'
                            required
                            value={value?.phonenumber}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Password"
                            type='password'
                            variant="outlined"
                            required
                            name='password'
                            value={value?.password}
                            onChange={(e) => handleOnchange(e)} />

                        <Button type='submit'>Sign up</Button>
                        <Link to='/login'>If you already have an account? - Login</Link>
                    </Box>
                </Paper>
            </Box>
        </form>
    );
}
