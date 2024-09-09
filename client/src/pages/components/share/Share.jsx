import Image from '../../../assets/image.png'
import Map from '../../../assets/map.png'
import Friend from '../../../assets/friends.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../../context/authContext'
import { useContext, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import './share.scss'
import instance from '../../../axios.js'


import React from 'react'

const Share = () => {

    const {currentUser} = useContext(AuthContext)
    const [ file, seFile ] = useState(null);
    const [ desc, setDesc ] = useState("");
    const queryClient = useQueryClient();

    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await instance.post("/upload", formData);
            return res.data
        } catch(error) {
            console.log(error)
        }
    }

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return instance.post('/posts', newPost)
        },     
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
        }
    })

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) {
            const url = await upload();
            imgUrl = url;
        }
        mutation.mutate({desc, img: imgUrl});
        setDesc("");
        seFile(null);
    }


    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        {currentUser?.profilePic ?
                        <img
                            src={currentUser.profilePic}
                            alt=""
                        /> : <AccountCircleIcon style={{width:"40px", height:"40px", color: "lightblue"}}/>}
                        <input 
                            type="text" 
                            placeholder={`What's on your mind ${currentUser.name}?`} 
                            onChange= {(e) => setDesc(e.target.value)} 
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img
                                className="file"
                                src={URL.createObjectURL(file)}
                                alt=""
                            />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input 
                            type="file" 
                            id="file" 
                            style={{display:"none"}} 
                            onChange={(e) => seFile(e.target.files[0])} 
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share
