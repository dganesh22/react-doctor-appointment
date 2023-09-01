import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddService(props) {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const token = context.token
    const currentUser = context.currentUser

    const [service,setService] = useState({
        name: "",
        desc: "",
        price: 0,
        category: "",
        gender: "",
        doc_id: currentUser._id
    })  

   
    const readValue = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('service =', service)
            await axios.post(`/api/service/add`, service, {
                headers: {
                    Authorization: `${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/doctor/service`)
            }).catch(err =>toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Add Service</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <form autoComplete="off" onSubmit={submitHandler}>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={service.name} onChange={readValue} className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" cols="30" rows="6" value={service.desc} onChange={readValue} className="form-control" required></textarea>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="price">Price (Consultation fee) </label>
                        <input type="number" name="price" id="price" value={service.price} onChange={readValue} className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={service.category} onChange={readValue} className="form-select" required>
                            <option value="null">Choose Category</option>
                            <option value="dental">Dental</option>
                            <option value="ortho">Ortho</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" value={service.gender} onChange={readValue} className="form-select" required>
                            <option value="null">Choose Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="male&female">Male & Female</option>
                            <option value="children">Children</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="Add New Service" className="btn btn-outline-success" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddService
