import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, loading} = useSelector(state => state.auth);

    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                <i className='fas fa-user' />
                    <span className='hide-sm'> Dashboard</span>
                </Link>
            </li>
            <li>
                <a href="!#" onClick={() => dispatch(logout)}>
                    <i className='fas fa-sign-out-alt' />
                    <span className='hide-sm'> Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/'>Developers</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    );

    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>) }
        </nav>
    )
}

export default Navbar