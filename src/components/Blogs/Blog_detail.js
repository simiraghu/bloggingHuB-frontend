import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spin from '../extras/Spin'

const Blog_detail = () => {

    const { id } = useParams()
    const [blog_data, setBlog_data] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const blog = async () => {
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get_blog_by_id/${id}`,
                {
                    headers: {
                        'token': token
                    }
                }
            )
           
            setBlog_data(data?.blog)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        blog()
    }, [])

    return (
        <div>
            {
                !isLoading ?
                    <div className='container text-center my-4'>
                        <h4>Title : {blog_data?.title}</h4>
                        <img src={blog_data?.image} alt="image" width='550' height='340' className='my-2' />
                        <h5>Author : {blog_data?.author}</h5>
                        <h5>Category : {blog_data?.categories}</h5>
                        <p>Content : {blog_data?.content}</p>

                    </div>
                    : <p className='container'><Spin /></p>
            }

        </div>
    )
}

export default Blog_detail