import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //Save the auth-token and redirect
            props.showAlert("Account created Successfully","success")
            localStorage.setItem('token', json.authToken);
            navigate('/Login')
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="login rounded container align-item-center my-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter your Full Name</label>
                    <input type="name" className="form-control" id="name" name="name" value={credentials.name} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address / Username</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} required minLength={5} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
                <Link className="mx-1 float-end mt-2" to="/SignUp">SignUp</Link>
                <span className="float-end mt-2">If you don't have a account Please</span>
            </form>
        </div>
    )
}

export default SignUp