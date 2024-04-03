import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //Save the auth-token and redirect
            props.showAlert("Login Successful", "success")
            localStorage.setItem('token', json.authToken);
            navigate('/Home')
        }
        else {
            props.showAlert("Invalid Login Details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container text-center">
            <h1><strong>iNOTEBOOK</strong></h1><h2>your notes on cloud</h2><h3>Please login using your credentials</h3></div>
            <div className="login rounded container align-item-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address / Username</label>
                        <input type="email" className="bg-input form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" required onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="bg-input form-control" id="password" name="password" value={credentials.password} required onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                    <Link className="mx-1 float-end mt-2" to="/SignUp"><strong><i>SignUp</i></strong></Link>
                    <span className="float-end mt-2">Don't have a account Please</span>
                </form>
            </div>

</>
    )
}

export default Login;