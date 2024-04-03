import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "",confirmPassword:"" });
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
            props.showAlert("Account created Successfully", "success")
            localStorage.setItem('token', json.authToken);
            navigate('/Login')
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="login rounded container align-item-center my-5">
            <h3 className='text-center'>Create an account to save your Notes</h3>
            <div className="container text-center my-3">
                <i><span>Have an account,  </span>
                    <Link className="mx-1" to="/login">Login Here</Link></i>
            </div>
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="confirmPassword" className="form-control" id="confirmPassword" name="confirmPassword" value={credentials.confirmPassword} required minLength={5} onChange={onChange} />
                </div>
                <div className="form-check form-group d-flex justify-content-between">
                    <div>
                        <input className="form-check-input mt-1" type="checkbox" value="" id="flexCheckDefault" required />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            I'm not a Robot
                        </label>
                    </div>
                    <button className="btn btn-primary Signup" type="submit">
                        SignUp
                    </button>
                </div>

            </form>
        </div>
    )
}

export default SignUp