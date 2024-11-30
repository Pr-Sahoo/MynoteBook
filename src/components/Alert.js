import React from 'react'

export const Alert = (props) => {
    return (
        <div>
            {props.show && <div className="alert alert-dark" role="alert">
                {props.msg}
            </div>}
        </div>
    )
}
