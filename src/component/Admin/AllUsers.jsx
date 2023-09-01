import React, { useEffect, useCallback, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'


function AllUsers(props) {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const token = context.token
    const [users,setUsers] = useState([])

    const initData = useCallback(() => {
        const readData = async () => {
            await axios.get(`/api/user/all`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                setUsers(res.data.users)
            }).catch(err => toast.error(err.response.data.msg))
        }

        readData()
    },[users])

    useEffect(() => {
        initData()
    },[initData])

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">All Users</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    users && users.map((item,index) => {
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td> {item.name} </td>
                                                <td> {item.email} </td>
                                                <td> {item.mobile} </td>
                                                <td> {item.role} </td>
                                                <td> { item.isActive ?  <span className="text-success">Active</span> : <span className="text-danger">Blocked</span> } </td>
                                                <td>
                                                    <NavLink to={`/admin/users/edit/${item._id}`} className="btn btn-info">
                                                        <i className="bi bi-pencil"></i>
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllUsers
