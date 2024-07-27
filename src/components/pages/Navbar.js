import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RiVideoAddFill } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";
import { message } from 'antd';
import axios from 'axios'


const Navbar = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        message.success("Logout successfully")

    }

    useEffect(() => {

        (
            async function () {
                if (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/')

                    try {

                        const token = localStorage.getItem('token')
                        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/verify`,
                            {
                                headers: {
                                    'token': token
                                }
                            })

                        if (!data?.success) {
                            handleLogout()
                        }

                    } catch (error) {
                        handleLogout()
                        console.log(error)
                    }


            }

        )()
    }, [location.pathname])


    const DrawerList = (
        <Box
            sx={
                {
                    width: 250
                }
            }
            role="presentation"
            onClick={toggleDrawer(false)}>

            <List>
                <ListItem></ListItem>
                <ListItem
                    sx={
                        {
                            cursor: 'pointer'
                        }
                    }
                    onClick={() => navigate('/user_profile')}>
                    <CgProfile
                        className='mx-2'
                    /> your profile</ListItem>

                <ListItem
                    sx={
                        {
                            cursor: 'pointer'
                        }
                    }
                    onClick={() => navigate('/create_blogs')}>
                    <RiVideoAddFill
                        className='mx-2'
                    /> Add blogs</ListItem>

                <ListItem
                    sx={
                        {
                            cursor: 'pointer'
                        }
                    }
                    onClick={() => navigate('/your_blogs')}>
                    <GoDeviceCameraVideo
                        className='mx-2'
                    /> your blogs</ListItem>

                <ListItem
                    sx={
                        {
                            cursor: 'pointer'
                        }
                    }
                    onClick={() => navigate('/all_blogs')} >
                    <MdOutlinePublic
                        className='mx-2'
                    /> public blogs</ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={
                    {
                        backgroundColor: "#7093a0",
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000
                    }
                }>

                <div className="container-fluid">
                    {
                        localStorage.getItem('token') ?
                            <>
                                <SlMenu
                                    style={
                                        {
                                            cursor: "pointer"
                                        }
                                    }
                                    onClick={toggleDrawer(true)} />


                                <Drawer open={open} onClose={toggleDrawer(false)}>
                                    {DrawerList}
                                </Drawer>
                            </>
                            : ""

                    }

                    <Link
                        className="navbar-brand mx-2"
                        to="/">BloggingHuB</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/">Home</Link>
                            </li>

                        </ul>
                    </div>
                    {
                        !localStorage.getItem('token') ?
                            <button
                                class="btn"
                                style={
                                    {
                                        backgroundColor: '#312c53',
                                        color: "white"
                                    }
                                }
                                type="submit"
                                onClick={() => navigate('/login')}>Login</button>
                            :
                            <button
                                class="btn"
                                style={
                                    {
                                        backgroundColor: '#312c53',
                                        color: "white"
                                    }
                                }
                                type="button"
                                onClick={() => handleLogout()}>Logout</button>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar