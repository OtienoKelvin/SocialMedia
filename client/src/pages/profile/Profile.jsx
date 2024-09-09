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
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";



const Profile = ({Post}) => {
    const {currentUser} = useContext(AuthContext)


    return (
        <div className="profile">
            <div className="images">
                <img src= {currentUser?.coverPic} alt="" className="cover" />
                <img src= {currentUser?.profilePic} alt="" className="profilePic" />
            </div>
            <div className="profilecontainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="https://facebook.com">
                            <FacebookTwoToneIcon color="primary"/>
                        </a>
                        <a href="https://twitter.com">
                            <XIcon color="primary"/>
                        </a>
                        <a href="https://instagram.com">
                            <InstagramIcon color="primary"/>
                        </a>
                        <a href="https://linkedin.com">
                            <LinkedInIcon color="primary"/>
                        </a>
                        <a href="https://pinterest.com">
                            <PinterestIcon color="primary"/>
                        </a>
                    </div>
                    <div className="center">
                        <span>John Doe</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon color="primary"/>
                                <span>USA</span>
                            </div>
                            <div className="item">
                                <LanguageIcon color="primary"/>
                                <span>English</span>
                            </div>
                            
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon/>
                        <MoreVertOutlinedIcon/>
                    </div>
                </div>
                <Posts/>
            </div>
        </div>
    );
};


export default Profile;