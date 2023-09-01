import React, { useContext, useCallback, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function UserAppointment() {
    const [appointments,setAppointments] = useState([])

    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const getAppointment = useCallback(() => {
        const readAppointment = async () => {
            await axios.get(`/api/appointment/all`, {
                headers: { Authorization: `${token}`}
            }).then(res => {
                 let fApp = res.data.appointments.filter((item) => item.user_id === currentUser._id)
                    setAppointments(fApp)
            }).catch(err => toast.error(err.response.data.msg))
        }
        readAppointment()
    },[])



    useEffect(() => {
        getAppointment()
    },[getAppointment])

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

export default UserAppointment
