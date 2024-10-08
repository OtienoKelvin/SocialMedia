import "./navBar.scss";
//import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import { AuthContext } from "../../../context/authContext";

const NavBar = () => {

    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
                    <span>BossSocial</span>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
                    <HomeRoundedIcon />
                </Link>
                { darkMode ?<LightModeOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} /> }
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user">
                    {currentUser?.profilePic ?<img
                        src={"/upload/" + currentUser.profilePic}
                        alt=""
                    /> : <AccountCircleIcon style={{width:"30px", height:"30px", color: "lightblue"}}/>}
                    <span>{currentUser.username}</span>
                </div>
            </div>
        </div>
    );
};


export default NavBar;