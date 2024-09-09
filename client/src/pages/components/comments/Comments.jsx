import React, { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../../context/authContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useQuery } from '@tanstack/react-query'
import instance from '../../../axios.js'
import moment from 'moment';




const Comments = ({postId}) => {

    const {currentUser} = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await instance.get(`/comments?postId=${postId}`);
            return res.data;
        }
    })


  return (
    <div className="comments">
        <div className="write">
            {currentUser?.profilePic ?<img src={currentUser.profilePic} alt="" /> : <AccountCircleIcon style={{width:"40px", height:"40px", color: "lightblue"}}/>}
            <input type="text" placeholder="write a comment" />
            <button>Send</button>
        </div>
        {isLoading ? "Loading..." : error ? "Something went wrong" : data.map((comment) => (
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))}
      
    </div>
  )
}

export default Comments
