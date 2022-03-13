import React from 'react'

const NavBar = () => {
    return (
        <nav style={{'backgroundColor': 'rbg(5, 5, 5)'}} className="navbar pb-3 pt-3 navbar-dark shadow-lg">
            <a className="navbar-brand" style={{'fontWeight': 'bold'}} href="#.">
                Link Shortener
            </a>
            <a href='#.'>
                <i class="fa fa-user-circle fa-2x text-white" aria-hidden="true"></i>
            </a>
        </nav>
    )
}

export default NavBar