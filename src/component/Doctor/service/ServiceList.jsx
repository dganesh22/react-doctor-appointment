import React, { useState, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


function ServiceList() {
    const [services,setServices] = useState([])
    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const initValue = useCallback(() => {
        const readValue = async () => {
            await axios.get(`/api/service/all`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                let data = res.data.services.filter((item) => item.doc_id === currentUser._id)
                setServices(data)
            }).catch(err => toast.error(err.response.data.msg))
        }
        readValue()
    },[services])

    useEffect(() => {
        initValue()
    },[initValue])

    const deleteHandler = async (id) => {
        try {
           if(window.confirm(`Are you sure to delete service?`)) {
                await axios.delete(`/api/service/delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg))
           } else {
                toast.warning(`service delete terimated`)
           }
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 mt-5">
                <NavLink to={`/doctor/service/add`} className="btn btn-outline-success float-end">Add Service</NavLink>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Service List</h3>
            </div>
            <div className="col-md-12">
                <div className="table table-repsonsive">
                    <table className="table table-bordered table-striped table-hovered text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services && services.map((item,index) => {
                                    return (
                                        <tr className="text-center" key={index}>
                                            <td> {item.name} </td>
                                            <td>
                                                <details>
                                                    <summary>Description</summary>
                                                    <p> {item.desc}</p>
                                                </details>    
                                            </td>
                                            <td> 
                                                <img src={item.image ? item.image.url : '#'} alt="no image" className="img-fluid rounded-circle"  style={{ width: '50px'}} />
                                            </td>
                                            <td> { item.price } </td>
                                            <td> { item.category } </td>
                                            <td> { item.gender } </td>
                                            <td>
                                                <NavLink to={`/doctor/service/edit/${item._id}`} className="btn btn-info">
                                                    <i className="bi bi-pencil"></i>
                                                </NavLink>
                                                <button onClick={() => deleteHandler(item._id)} className="btn btn-danger float-end">
                                                        <i className="bi bi-trash"></i>
                                                </button>
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

export default ServiceList
