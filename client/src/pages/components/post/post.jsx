import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import './post.scss'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comments from '../comments/Comments';
import moment from 'moment';


const Post = ({post}) => {

    const [commentOpen, setCommentOpen] = useState(false);

    const liked = false;

  return (
    <div className='post'>
        <div className="container">
            <div className="user">
                <div className="userInfo">
                    {post?.profilePic ?<img src={post.profilePic} alt="" /> : <AccountCircleIcon style={{width:"40px", height:"40px", color: "lightblue"}}/>}
                    <div className="details">
                        <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span className='name'>{post.username}</span>                            
                        </Link>
                        <span className='date'>{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizIcon />
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={ "./upload/" + post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
                    12 Likes
                </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    <TextsmsOutlinedIcon/>
                    12 Comments
                </div>
                <div className="item">
                    <ShareOutlinedIcon/>
                    Share
                </div>
            </div>
            {commentOpen && <Comments postId={post.id}/>}
        </div>
    </div>
  )
}

export default Post
