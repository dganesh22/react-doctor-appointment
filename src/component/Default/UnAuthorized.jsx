import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

function UnAuthorized(props) {
    const context = useContext(AuthContext)
    const token = context.token
    const isUser = context.isUser
    const isAdmin = context.isAdmin
    const isDoctor = context.isDoctor

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="text-danger display-3">
                    Un-Authorized Entry
                </h3>
                {
                    token && isUser ? <NavLink to={`/`} className="btn btn-success">Home</NavLink>: null
                }
                {
                    token && isAdmin ? <NavLink to={`/admin/dashboard`} className="btn btn-success">Home</NavLink>: null
                }
                {
                    token && isDoctor ? <NavLink to={`/doctor/dashboard`} className="btn btn-success">Home</NavLink>: null
                }
            </div>
        </div>
    </div>
  )
}

export default UnAuthorized
