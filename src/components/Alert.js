import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${(props.type.toLowerCase())} alert-item position-relative ${!props.show && 'alert-transition'}`} role="alert">
            {props.message}
        </div>
    )
}

export default Alert