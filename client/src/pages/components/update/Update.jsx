import React, { useState } from 'react'
import './update.scss'
import instance from '../../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const Update = ({setOpenUdate, user}) => {
    
    const queryClient = useQueryClient();
    const [coverPic, setCoverPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.city,
        website: user.website,
    })

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await instance.post("/upload", formData);
            return res.data 
        } catch (err) {
            console.log(err);
        }
        
    }

    const mutation = useMutation({
        mutationFn: (userUpdate) => {
            return instance.put("/users", userUpdate)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    })

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: [e.target.value]}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let coverPicUrl = user.coverPic;
        let profilePicUrl = user.profilePic;
        if (coverPic) {
            coverPicUrl = await upload(coverPic);
        }
        if (profilePic) {
             profilePicUrl = await upload(profilePic);
        }
        const updatedUser = {
            ...inputs,
            coverPic: coverPicUrl,
            profilePic: profilePicUrl
        }
        mutation.mutate(updatedUser);
        setOpenUdate(false);
        setCoverPic(null);
        setProfilePic(null);
    }



    return (
        <div className='update'>
            <div className="wrapper">
                <h1>Update Your Account</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="files">
                        <label htmlFor="coverPic">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img src={coverPic ? URL.createObjectURL(coverPic) : "/upload/" + user.coverPic} alt="" />
                                <CloudUploadIcon className='icon'/>
                            </div>
                        </label>
                        <input type="file" id='coverPic' name='coverPic' onChange={(e) => setCoverPic(e.target.files[0])} placeholder='Cover' style={{display:"none"}}/>
                        <label htmlFor="profilePic">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img src={profilePic ? URL.createObjectURL(profilePic) : "/upload/" + user.profilePic} alt="" />
                                <CloudUploadIcon className='icon'/>
                            </div>
                        </label>
                        <input type="file" id='profilePic' name='profilePic' onChange={(e) => setProfilePic(e.target.files[0])} placeholder='Profile' style={{display:"none"}}/>
                    </div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' onChange={handleChange} placeholder='Name' value={inputs.name} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={handleChange} placeholder='Username' value={inputs.username}/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' onChange={handleChange} placeholder='Email' value={inputs.email} />
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' onChange={handleChange} placeholder='City' value={inputs.city}/>
                    <label htmlFor="website">Website</label>
                    <input type="text" name='website' onChange={handleChange} placeholder='Website' value={inputs.website}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={handleChange} placeholder='Password' value={inputs.password} />
                    <button type='submit'>Update</button>
                </form>
                <button className='close' onClick={() => setOpenUdate(false)}>Close</button>
            </div>    
        </div>
    )
}

export default Update
