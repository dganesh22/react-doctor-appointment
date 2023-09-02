import React, { useState, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

function UpdateService(props) {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const token = context.token
    const currentUser = context.currentUser
    const params = useParams()

    const [service,setService] = useState({
        name: "",
        desc: "",
        price: 0,
        category: "",
        gender: "",
        doc_id: currentUser._id
    })  

    const initData = useCallback(() => {
      const readData = async () => {
          await axios.get(`${URL}/api/service/single/${params.id}`, {
              headers: {
                Authorization: `${token}`
              }
          }).then(res => {
              // console.log('single service =', res);
              setService(res.data.service)
          }).catch(err => toast.error(err.message))
      }
      readData()
    },[])

    useEffect(() => {
      initData()
    },[initData])
   
    const readValue = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('service =', service)
            await axios.patch(`${URL}/api/service/update/${params.id}`, service, {
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
                <h3 className="display-3 text-success">Update Service</h3>
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
                        <label htmlFor="price">Price</label>
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
                            <option value="children">Children</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="Update Service" className="btn btn-outline-success" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateService
