import React, { useContext, useState } from 'react'
import './comments.scss'
import { AuthContext } from '../../../context/authContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
    });
    const quaryClient = useQueryClient();
    const [ desc, setDesc ] = useState("");

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return instance.post('/comments', newComment)
        },
        onSuccess: () => {
            quaryClient.invalidateQueries(['comments'])
        }
    })


    const handkleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({desc, postId});
        setDesc("");

    }

  return (
    <div className="comments">
        <div className="write">
            {currentUser?.profilePic ?<img src={currentUser.profilePic} alt="" /> : <AccountCircleIcon style={{width:"40px", height:"40px", color: "lightblue"}}/>}
            <input type="text" placeholder="write a comment" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button onClick={handkleClick}>Send</button>
        </div>
        {isLoading ? "Loading..."  : data.map((comment) => (
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.username}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))}      
    </div>
  )
}

export default Comments
