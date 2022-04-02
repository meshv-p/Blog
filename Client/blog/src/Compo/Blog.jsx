import React from 'react'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';
export const Blog = ({ blog }) => {

    let history = useNavigate();
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        // console.log(color);
        /* eslint-enable no-bitwise */
        return color;
    }
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: name.charAt(0),
        };
    }

    const openBlog = (e) => {
        // console.log(e.currentTarget.dataset.key)
        let id = e.currentTarget.dataset.key;
        history(`/blog/${id}`);
    }

    return (
        <>
            <Card elevation={3} sx={{ my: 2, cursor: 'pointer' }} onClick={(e) => openBlog(e)} data-key={blog._id} key={blog._id} >
                <CardHeader
                    avatar={
                        <Avatar src={blog.user[0]?.Profile_pic} alt="Username" {...stringAvatar(blog.user[0]?.username ? blog.user[0].username : 'Admin')} />
                    }
                    title={blog.user[0]?.username}
                    // subheader="Today,a min ago"
                    subheader={new Date(blog.createdAt).toLocaleString()}
                />
                <CardContent>
                    <Typography variant='body1'>
                        {blog.title}
                    </Typography>
                    <Typography variant='body2' color="text.secondary">
                        {blog.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton>
                        <ChatBubbleIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton>
                        <SendIcon />
                    </IconButton>

                </CardActions>
            </Card>
        </>
    )
}
