import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate, NavLink, useParams } from 'react-router-dom'

const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

function UpdateUserInfo(props) {
    const context = useContext(AuthContext)
    const token = context.token
    const params = useParams()
    const navigate = useNavigate()

    const [user,setUser] = useState({
        role: "",
        isActive: true
    })

    const readValue = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let data = {
                role: user.role,
                isActive: user.isActive,
                userId: params.id
            }
            await axios.patch(`${URL}/api/admin/change/role`, data, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/admin/users/all`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Change Role</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="role">Role</label>
                                <select name="role" id="role" value={user.role} onChange={readValue} className="form-select" required>
                                    <option value="null">Choose role</option>
                                    <option value="user">User</option>
                                    <option value="doctor">Doctor</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="isActive">Active Status</label>
                                <select name="isActive" id="isActive"  value={user.isActive} onChange={readValue} className="form-select" required>
                                    <option value="null">Choose Active Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Blocked</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Update User" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateUserInfo
