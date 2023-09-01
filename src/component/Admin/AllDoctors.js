import React, { useContext, useCallback, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink } from 'react-router-dom'


function AllDoctors(props) {
    const [doctors,setDoctors] = useState([])
    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const getDoctor = useCallback(() => {
        const readDoctor = async () => {
            await axios.get(`/api/admin/all/reg/doctors`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                setDoctors(res.data.doctors)
            }).catch(err => toast.error(err.response.data.msg))
        }

        readDoctor()
    },[])

    useEffect(() => {
        getDoctor()
    },[])

    if(!doctors) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">Doctors List is Empty</h3>
                    </div>
                </div>
         </div>
        )
    }



  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">All Doctors</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped text-center">
                        <thead>
                            <tr>
                                <th colSpan={6}>
                                    <NavLink to={`/admin/add/doctor`} className="btn btn-success float-end">Add Doctor</NavLink>
                                </th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Image</th>
                                <th>Doctor Info</th>
                                <th>Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors && doctors.map((item,index) => {
                                    return (
                                        <tr key={index} >
                                            <td> {item.name } </td>
                                            <td> { item.email } </td>
                                            <td> { item.mobile } </td>
                                            <td>
                                                <img src={item.image ? item.image.url : "#"} alt="no image" className="img-fluid rounded-circle" style={{ width: '60%'}} />
                                            </td>
                                            <td>
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <details>
                                                            <summary>Doctor Id</summary>
                                                            <p className="text-success"> { item.doctorId } </p>
                                                        </details>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <details>
                                                                <summary>Department</summary>
                                                                <p className="text-success"> { item.department } </p>
                                                        </details>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <details>
                                                                <summary>Qualification</summary>
                                                                <p className="text-success"> { item.qualification } </p>
                                                        </details>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <details>
                                                                <summary>Description</summary>
                                                                <p className="text-success"> { item.description } </p>
                                                        </details>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td> { item.experience } years</td>
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

export default AllDoctors
