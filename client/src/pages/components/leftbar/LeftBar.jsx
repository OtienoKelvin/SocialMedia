import "./leftBar.scss";
import Friends from "../../../assets/friends.png";
import Groups from "../../../assets/groups.png";
import Market from "../../../assets/market.png";
import Memories from "../../../assets/memories.png";
import Watch from "../../../assets/watch.png";
import Events from "../../../assets/events.png";
import Gaming from "../../../assets/gaming.png";
import Gallery from "../../../assets/gallery.png";
import Videos from "../../../assets/video.png";
import Messages from "../../../assets/mail.png";
import Tutorials from "../../../assets/tutorial.png";
import Courses from "../../../assets/course.png";
import Fund from "../../../assets/fund.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";


const LeftBar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        {currentUser?.profilePic ? <img src={currentUser?.profilePic} alt="" /> : <AccountCircleIcon style={{width:"30px", height:"30px", color: "lightblue"}}/>}
                        <span>{currentUser.username}</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt=""/>
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt=""/>
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt=""/>
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt=""/>
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt=""/>
                        <span>Memories</span>
                    </div>
                </div> 
                <hr /> 
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt=""/>
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt=""/>
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt=""/>
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt=""/>
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt=""/>
                        <span>Messages</span>
                    </div>
                </div> 
                <hr /> 
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Tutorials} alt=""/>
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt=""/>
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={Fund} alt=""/>
                        <span>Fund</span>
                    </div>
                </div>                             
            </div>
        </div>
    );
};


export default LeftBar;