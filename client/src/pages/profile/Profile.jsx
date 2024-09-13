import "./profile.scss";
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Posts from "../components/posts/Posts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../axios";
import { useLocation } from "react-router-dom";
import Update from "../components/update/Update";



const Profile = () => {
    const [openUpdate, setOpenUdate] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await instance.get(`/users/find/${userId}`);
            return res.data;
        }
    });
    console.log(data)

    const { data: relationshipData } = useQuery({
        queryKey: ['relationships'],
        queryFn: async () => {
            const res = await instance.get(`/relationships?followedUserId=${userId}`);
            return res.data;
        }
    });
    console.log(userId)

    console.log(relationshipData)

    const mutation = useMutation({
        mutationFn: async (following) => {
            if (following) return instance.delete(`/relationships?followedUserId=${userId}`);
            return instance.post("/relationships", { userId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['relationships']);
        },
        onError: (error) => {
            console.error("Error following/unfollowing user:", error);
        }
    });

    const handleFollow = async () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile data</div>;

    return (
        <div className="profile">
            <div className="images">
                <img src={"/upload/" + data?.coverPic || 'defaultCoverPic.jpg'} alt="Cover" className="cover" />
                <img src={"/upload/" + data?.profilePic || 'defaultProfilePic.jpg'} alt="Profile" className="profilePic" />
            </div>
            <div className="profilecontainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="https://facebook.com">
                            <FacebookTwoToneIcon color="primary" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <XIcon color="primary" />
                        </a>
                        <a href="https://instagram.com">
                            <InstagramIcon color="primary" />
                        </a>
                        <a href="https://linkedin.com">
                            <LinkedInIcon color="primary" />
                        </a>
                        <a href="https://pinterest.com">
                            <PinterestIcon color="primary" />
                        </a>
                    </div>
                    <div className="center">
                        <span>{data?.name || 'Unknown User'}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon color="primary" />
                                <span>{data?.city || 'Unknown City'}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon color="primary" />
                                <span>{data?.website || 'No Website'}</span>
                            </div>
                        </div>
                        {userId === currentUser.id ? <button onClick={() => setOpenUdate(true)}>Update</button>
                            : <button onClick={handleFollow}>{relationshipData?.includes(currentUser.id) ? "Following" : "Follow"}</button>}
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertOutlinedIcon />
                    </div>
                </div>
                <Posts userId={userId}/>
            </div>
            {openUpdate && <Update setOpenUdate={setOpenUdate} user={data}/>}
        </div>
    );
};

export default Profile;
