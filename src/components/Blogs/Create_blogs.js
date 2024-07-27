import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd';

export default function SimplePaper() {

    const navigate = useNavigate()

    const [image, setImage] = useState('');
    const [imageBase64, setImageBase64] = useState("");
    const [value, setValue] = useState(
        {
            title: '',
            content: '',
            author: '',
            categories: ''
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
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/blog/create_blog`,
                {
                    title: value?.title,
                    content: value?.content,
                    author: value?.author,
                    categories: value?.categories,
                    image: imageBase64
                },

                {
                    headers: {
                        'token': token
                    }
                }
            )

            if (data?.success) {
                message.success(data?.message)
            }
            navigate('/your_blogs')

        } catch (error) {
            message.error(error?.response?.data?.message)
            console.log(error)
        }

    }


    // convert image file to base64
    const setFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageBase64(reader.result);
        };
    };

    // receive file from form
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setFileToBase64(file);
    };


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
                        <h4>Create your Blog</h4>

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Title"
                            variant="outlined"
                            type='text'
                            name='title'
                            required
                            value={value?.title}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="Content"
                            variant="outlined"
                            type='text'
                            name='content'
                            required
                            value={value?.content}
                            onChange={(e) => handleOnchange(e)} />

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            label="author"
                            type='text'
                            variant="outlined"
                            name='author'
                            required
                            value={value?.author}
                            onChange={(e) => handleOnchange(e)} />


                        <FormControl sx={{ m: 1, width: '25vw' }} variant="outlined">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="categories"
                                name="categories"
                                value={value?.categories}
                                required
                                onChange={(e) => handleOnchange(e)}
                                label="Category"
                            >
                                <MenuItem value="technology">Technology</MenuItem>
                                <MenuItem value="health">Health</MenuItem>
                                <MenuItem value="travel">Travel</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="lifestyle">Lifestyle</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            sx={
                                {
                                    m: 1,
                                    width: '25vw'
                                }
                            }
                            variant="outlined"
                            type='file'
                            name='image'
                            accept='image/*'
                            required
                            onChange={(e) => handleImage(e)} />

                        <Button type='submit'>Create blog</Button>
                    </Box>
                </Paper>
            </Box>
        </form>
    );
}
