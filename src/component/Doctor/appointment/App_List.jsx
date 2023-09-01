import React, { useState, useCallback, useEffect, useContext} from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'


function AppList(props) {
    const [appointments,setAppointments] = useState([])

    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const getAppointment = useCallback(() => {
        const readAppointment = async () => {
            await axios.get(`/api/doctor/appointments`, {
                headers: { Authorization: `${token}`}
            }).then(res => {
                    setAppointments(res.data.appointments)
            }).catch(err => toast.error(err.response.data.msg))
        }
        readAppointment()
    },[])



    useEffect(() => {
        getAppointment()
    },[getAppointment])


    // confirm handler
    const confirmHandler = async (id) => {
        await axios.patch(`/api/appointment/update/${id}`, {
            app_status: "booked",
            confirm: true
        } , {
            headers: {
                Authorization: `${token}`
            }
        }).then(res => {
            toast.success(res.data.msg)
            window.location.reload()
        }).catch(err => toast.error(err.response.data.msg))
    }

    // cancel handler 
    const cancelHandler = async (id) => {
        if(window.confirm(`Are you sure to cancel an appointment?`)) {
            await axios.patch(`/api/appointment/update/${id}`, {
                app_status: "cancelled",
                confirm: false
            } , {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }
    }

    // delete handler 
    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete an appointment?`)) {
            await axios.delete(`/api/appointment/delete/${id}`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }
    }

    if(appointments.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">No Appointments</h3>
                    </div>
                </div>
            </div>
        )
    }


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Appointments List</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <div className="table table-responsive">
                    <table className="table table-striped table-hovered table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Confirmation</th>
                                <th>Service</th>
                                <th>Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments && appointments.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td> { new Date(item.app_date).toLocaleString() } </td>
                                            <td> { item.app_status } </td>
                                            <td> { item.confirm ? "Confirmed" : "Not Confirmed"} </td>
                                            <td> { item.service.name } </td>
                                            <td> &#8377; { item.service.price } </td>
                                            <td className="d-flex justify-content-evenly">
                                                {
                                                    item.confirm ? (
                                                        <button onClick={() => cancelHandler(item._id)} className="btn btn-outline-warning" title="Cancel">
                                                        <i className="bi bi-x-circle-fill"></i>
                                                    </button>
                                                    ): (
                                                        <>
                                                        <button onClick={()=> confirmHandler(item._id)} className="btn btn-outline-success" title="Confirm">
                                                         <i className="bi bi-check-circle-fill"></i>
                                                        </button>
                                                        <button onClick={() => deleteHandler(item._id)} className="btn btn-outline-danger" title="Delete">
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </>
                                                    )
                                                }
                                               
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

export default AppList
