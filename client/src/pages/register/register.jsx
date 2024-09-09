import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";




const Register = () => {

    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/auth/register", inputs);

        } catch (error) {
            setError(error.response.data);
        }
        
    }
  


    return (
        <div className="register">
            <div className='card'>
                <div className='left'>
                    <h1>Boss Social </h1> 
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, voluptatibus.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to={"/login"}>
                        <button>Login</button>
                    </Link>       
                </div>
                <div className='right'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />

                        {error && error}
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default Register;