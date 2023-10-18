import React, {useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
const Navbar = () => {
        let location=useLocation();
        useEffect(() => {
            console.log(location.pathname);
        }, [location]);
        return(
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/Login" >iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${location.pathname==="/Home"?"active":""}`} aria-current="page" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${location.pathname==="/About"?"active":""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/SignUp" role="button">SignUp</Link>
                        </form>
                    </div>
                </div>
            </nav>
    )
}
export default Navbar