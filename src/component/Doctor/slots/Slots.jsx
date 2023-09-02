import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../Context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

function Slots() {
    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser

    const [slots,setSlots] = useState([])

    const navigate = useNavigate()

    const initData = useCallback(() => {
        const readData = async () => {
            const res= await axios.get(`${URL}/api/slot/all`, {
                headers: {
                    Authorization: `${token}`
                }
            })

            let filteredSlots = res.data.slots.filter(item => item.doc_id === currentUser._id)
                setSlots(filteredSlots)
        }
        readData()
    },[])

    useEffect(() => {
        initData()
    }, [initData])


    // delete slot
    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete the slot?`)) {
                await axios.delete(`${URL}/api/slot/delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(res => {
                    toast.success(res.data.msg)
                    navigate(`/doctor/slots`)
                    window.location.reload()
                }).catch(err => toast.error(err.response.data.msg))
        } else {
            toast.warning(`delete terminated`)
        }
    }

    if(slots.length === 0) {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add New Slot</NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">No Slots List</h3>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="container">
        <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add New Slot</NavLink>
                    </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Slots List</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <div className="table table-responsive">
                    <table className="table table-striped table-hovered table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Slot Time</th>
                                <th>Slot Status</th>
                                <th>isActive</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    slots && slots.map((item,index) => {
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td> { new Date(item.slot_date).toLocaleString() } </td>
                                                <td> { item.slot_status ? 
                                                    <span className="text-success">Available</span> : <span className="text-danger">Booked</span> } </td>
                                                <td>
                                                { item.isActive ? 
                                                    <span className="text-success">Active</span> : <span className="text-danger">In-Active</span> }
                                                </td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`/doctor/slots/edit/${item._id}`} className="btn btn-info">
                                                         <span className="bi bi-pencil"></span>
                                                    </NavLink>

                                                    <button onClick={() => deleteHandler(item._id)} className="btn btn-danger">
                                                        <span className="bi bi-trash float-end"></span>
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

export default Slots
