import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
const NavBar = (props) => {
    return (
        <nav style={{ 'backgroundColor': 'rbg(5, 5, 5)' }} className="navbar pb-3 pt-3 navbar-dark">
            <Link className="navbar-brand" style={{ 'fontWeight': 'bold', 'fontSize': '25px' }} to={'/'}>
                Link Shortener
            </Link>
            {
                typeof props.user === 'undefined' || props.user === null ?
                    <Link to='/login' className="fa fa-user-circle fa-2x text-white no-underline" aria-hidden="true"></Link>
                    :
                    <Link aria-disabled="true" className='h5 no-underline' to="">Hola, {props.user.username}</Link>
            }
        </nav>
    )
}

export default NavBar