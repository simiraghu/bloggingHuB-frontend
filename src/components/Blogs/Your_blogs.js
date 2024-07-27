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
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuMoreVertical } from "react-icons/lu";
import axios from 'axios'
import Spin from '../extras/Spin'
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IoWarningSharp } from "react-icons/io5";
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { message } from 'antd';


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ITEM_HEIGHT = 48;

export default function RecipeReviewCard() {

  const [blog_data, setBlog_data] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blogId, setBlogId] = useState(null);

  const [modalOpen, setOpen] = useState(false);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  const handleOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setBlogId(id)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    try {

      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/blog/delete_blog/${id}`, {},
        {
          headers: {
            'token': token
          }
        }
      )
      if (data?.success) {
        message.success(data?.message)
      }

      your_blogs()
      setOpen(false)

    } catch (error) {
      console.log(error)
      message.error(error?.response?.data?.message)
    }
  };

  const handleExpandClick = (id) => {
    navigate(`/blog_detail/${id}`)
  };

  const handleOpenModal = (blogId) => {
    setBlogId(blogId);
    handleOpen()
  };

  const your_blogs = async () => {

    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get_blogs_by_userid?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            'token': token
          }
        }
      )
      setBlog_data(data?.blogs)
      setIsLoading(false)
      setTotal(data?.total)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    your_blogs()
  }, [currentPage])

  const onChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <>
      <div className='row row-cols-1 row-cols-md-3 g-4 my-3 mx-3'>
        {
          isLoading ?
            <p
              className='container my-2'>
              <Spin />
            </p>
            :
            blog_data.length > 0
              ?
              blog_data?.map((blog) => (
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
                      <>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleClick(event, blog)}
                        >
                          <LuMoreVertical />
                        </IconButton>

                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={handleClose}
                          PaperProps={
                            {
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                              },
                            }
                          }
                        >
                          <MenuItem onClick={() => {
                            navigate(`/update_blog/${blogId?._id}`);
                            handleClose()
                          }
                          }>
                            Edit
                          </MenuItem>

                          <MenuItem onClick={() => {
                            handleOpenModal(blogId);
                            handleClose();
                          }}>
                            Delete
                          </MenuItem>

                        </Menu>

                        <Modal
                          open={modalOpen}
                          onClose={modalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2">
                              <IoWarningSharp /> {`Are you sure you want to delete this ${blogId?.title} ?`}
                            </Typography>

                            <Button
                              type='button'
                              onClick={modalClose}>
                              Cancel
                            </Button>

                            <Button
                              type='button'
                              onClick={() => handleDelete(blogId?._id)}>
                              Delete
                            </Button>
                          </Box>
                        </Modal>
                      </>
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
              )) : "No blogs here"
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
            page={currentPage}
            pageSize={pageSize}
            onChange={onChange}
          />
        </Stack>
      </div>
    </>


  );
}
