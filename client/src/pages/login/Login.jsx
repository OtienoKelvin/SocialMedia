import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";



const Login = () => {

    const {login} = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const hundleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (error) {
            setError(error.response.data);
        }
        
    }


    return (
        <div className="login">
            <div className='card'>
                <div className='left'>
                    <h1>Hello world</h1> 
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, voluptatibus.
                    </p>
                    <span>Don't have an account?</span>
                    <Link to={"/register"}>
                        <button>Register</button>
                    </Link>        
                </div>
                <div className='right'>
                    <h1>Login</h1>
                    <form onSubmit={hundleSubmit}>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {error && <p style={{color:"red"}}>{error}</p> }
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Login;