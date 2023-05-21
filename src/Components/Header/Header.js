import React from 'react'
import logo from '../../assert/images/expense.1.jpg'
import './Header.css'
import { Link } from 'react-router-dom'

function Header(props) {

    const onLogoutHandler = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-xl bg-dark">

                <div className="container">
                    <img src={logo} />
                    <a className="navbar-brand text-white fs-3 fw-3" href="#">Expense</a>
                    <button type="button" data-toggle="collapse" data-target="#navbar-menu" className="navbar-toggler me-3 text-white">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav ms-auto" >

                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addexpense">Add Expense</Link>
                            </li>
                            {props.login !== 'true' && <div > <li className="nav-item">
                                <Link className="nav-link" to="/">SignUp</Link>
                            </li>
                        
                             <li className="nav-item" type="submit"><Link className="nav-link" to="/login">Login</Link></li>

                            </div>}
                            {props.login == 'true' && <div>
                                <li className="nav-item" type="submit"><Link className="nav-link" to="/" onClick={onLogoutHandler}>Logout</Link></li>

                            </div>}

                        </ul>

                    </div>

                </div>

            </nav>

        </div>
    )
}

export default Header
