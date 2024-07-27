import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MdOutlineFavorite } from "react-icons/md";
import { LuMoreVertical } from "react-icons/lu";
import axios from 'axios'
import Spin from '../extras/Spin'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {

    const [blog_data, setBlog_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState("all");
    const [currentpage, setcurrentpage] = useState(1)
    const [total, setTotal] = useState(0)

    const [pageSize] = useState(5);

    const navigate = useNavigate()

    const handleExpandClick = (id) => {
        navigate(`/blog_detail/${id}`)
    };


    const debounce = (func, delay) => {
        let timeoutId;

        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleSearch = debounce(async (e) => {
        const token = localStorage.getItem('token')
        try {
            if (categories !== 'all') {

                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/search_blog?title=${e.target.value}&page=${currentpage}&size=${pageSize}&categories=${categories}`,
                    {
                        headers: {
                            'token': token
                        }
                    }
                );
                setBlog_data(data?.blogs)
                setTotal(data?.total)

                

            } else {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/search_blog?title=${e.target.value}&page=${currentpage}&size=${pageSize}`,
                    {
                        headers: {
                            'token': token
                        }
                    }
                );

                 if (e.target.value === '') {
                        your_blogs()
                    }
                    
                setBlog_data(data?.blogs)
                setTotal(data?.total)
            }

        } catch (error) {
            console.log(error);
        }
    }, 800);

    const your_blogs = async () => {

        try {
            if (categories !== 'all') {
                const token = localStorage.getItem('token')
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get_all_blogs?categories=${categories}&page=${currentpage}&size=${pageSize}`,
                    {
                        headers: {
                            'token': token
                        }
                    }
                )
                setBlog_data(data?.blogs)
                setTotal(data?.count)
                setIsLoading(false)

            } else {
                const token = localStorage.getItem('token')
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get_all_blogs?page=${currentpage}&size=${pageSize}`,
                    {
                        headers: {
                            'token': token
                        }
                    }
                )
                
                setBlog_data(data?.blogs)
                setTotal(data?.total)
                setIsLoading(false)

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        your_blogs()
    }, [categories, currentpage])


    const onChange = (event, value) => {
        setcurrentpage(value)
    }

    return (
        <>
            <FormControl
                sx={
                    {
                        m: 2,
                        width: '18vw'
                    }
                }
                variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="categories"
                    name="categories"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    label="Category"
                >
                    <MenuItem value="all">All</MenuItem>
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
                        m: 2,
                        width: '18vw'
                    }
                }
                id="outlined-search"
                label="Search field"
                type="search"
                name='search'
                onChange={handleSearch} />

            <div className='row row-cols-1 row-cols-md-3 g-4 mx-2 my-1' >
                {
                    isLoading ? <p
                        className='container my-2'>
                        <Spin />
                    </p>
                        :
                        blog_data.length > 0 ? blog_data?.map((blog) => (
                            <>
                                <Card
                                    sx={
                                        {
                                            maxWidth: 345,
                                            margin: 1,
                                            borderRadius: '20px',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                        }
                                    }>

                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                sx={
                                                    {
                                                        bgcolor: 'gray'
                                                    }
                                                }
                                                aria-label="recipe">
                                                {blog?.title?.charAt(0)}
                                            </Avatar>
                                        }

                                        action={
                                            <IconButton aria-label="settings">
                                                <LuMoreVertical />
                                            </IconButton>
                                        }

                                        title={blog?.title}
                                        subheader={new Date(blog?.createdAt).toLocaleString('en-IN',
                                            {
                                                timeZone: 'Asia/Kolkata',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: true
                                            })}

                                    />

                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={blog?.image}
                                        alt="Paella dish"
                                    />

                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary">
                                            <p>Author :  {blog?.author}</p>
                                            <b>For read content click on arrow button</b>
                                        </Typography>
                                    </CardContent>

                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <MdOutlineFavorite />
                                        </IconButton>

                                        <ExpandMore
                                            onClick={() => handleExpandClick(blog?._id)}
                                            aria-label="show more"
                                        >
                                            <FaLongArrowAltRight />
                                        </ExpandMore>
                                    </CardActions>

                                </Card>
                            </>
                        )) : <p
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: 'auto'
                                }
                            }>No blogs here</p>
                }

            </div>

            <div style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '25px'
                }
            }>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(total / pageSize)}
                        page={currentpage}
                        pageSize={pageSize}
                        onChange={onChange}
                    />
                </Stack>
            </div>
        </>
    );
}
