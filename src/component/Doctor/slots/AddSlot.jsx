import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

function AddSlot() {
    const context = useContext(AuthContext)
    const token = context.token
    const currentUser = context.currentUser
    const navigate = useNavigate()

    const [slot,setSlot] = useState({
        doc_id: currentUser._id,
        slot_date: ""
    })

    const readValue = (e) => {
        const { name, value } = e.target
        setSlot({ ...slot, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${URL}/api/slot/create`, slot, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/doctor/slots`)
            }).catch(err => toast.error(err.response.data.msg))
        }catch(err) {
            toast.error(err.message)
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Add Slot</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="doc_id">Doctor Id</label>
                                <input type="text" name="doc_id" id="doc_id" value={slot.doc_id} onChange={readValue} className="form-control" readOnly/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="slot_date">Slot date</label>
                                <input type="datetime-local" name="slot_date" id="slot_date" value={slot.slot_date} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Add New Slot" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddSlot
