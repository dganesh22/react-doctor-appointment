import React, { useContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

function Home(props) {
  const [services,setServices] = useState([])
  const context = useContext(AuthContext)
  const token = context.token
  const currentUser = context.currentUser
  const navigate = useNavigate()

  const getServices = useCallback(() => {
      const readService = async () => {
          await axios.get(`${URL}/api/service/all`, {
              headers: {
                Authorization: `${token}`
              }
          }).then(res => {
              if(currentUser.role === "doctor") {
                let data = res.data.services.filter((item) => item.doc_id === currentUser._id)
                setServices(data)
              } 
                setServices(res.data.services)
              
          }).catch(err => toast.error(err.msg))
      }

      readService()
  },[])

  useEffect(() => {
    getServices()
  },[])


  const bookingHandler = async (service) => {
      let data = {
          user_id: currentUser._id,
          service: service
      }

      console.log('booking =', data)
      await axios.post(`${URL}/api/appointment/add`, data, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        toast.success(res.data.msg)
        navigate(`/user/appointments`)
      }).catch(err => toast.error(err.response.data.msg))
  }

  return (
    <section id='hero'>
        <div className="container-fluid" id='home'>
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-dark display-6">Welcome to</h6>
              <h3 className="display-1 text-white">
                  Health <span className="text-secondary">Care</span>
              </h3>

             <div className="row">
              <div className="col-md-8 col-sm-12 col-lg-8">

                <div className="card">
                    <div className="card-body">
                      <p className="text-success">
                        <strong>Find Services</strong>
                      </p>
                      <hr />
                      <form autoComplete='off'>
                          <div className="form-group mt-3">
                              <div className="input-group">
                                  <input type="search" name="location" id="location" className="form-control" placeholder="Service"  required/>
                                  <button className="btn btn-outline-success">
                                      <span className="bi bi-search"></span>
                                  </button>
                              </div>
                          </div>
                      </form>
                    </div>
                </div>
              </div>
             </div>
            </div>
            <div className="col-md-6">
                <div className="img-container">
                    <img src="https://res.cloudinary.com/dgn1jgwfg/image/upload/v1692958168/images/Medicine_uqz7ps.svg" alt="no image" className="rounded img-fluid" />
                </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="col-md-12 text-center mt-4 mb-4">
            <h3 className="display-3 text-success">
                Services
            </h3>
          </div>
          <div className="row">
              {
                 services && services.map((item,index) => {
                      return (
                        <div className="col-md-6 col-sm-12 col-lg-4 mt-2 mb-2" key={index}>
                            <div className="card">
                              <img src={item.image? item.image.url : ""} alt="no image" className="card-img-top" />
                              <div className="card-body">
                                  <h5 className="text-success text-center">
                                      { item.name }
                                  </h5>
                                  <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong className="text-success">Constultation-Fee</strong>
                                        <span className="text-dark float-end"> &#8377; { item.price } </span>
                                    </li>
                                    <li className="list-group-item">
                                        <details>
                                          <summary className="text-success">Description</summary>
                                          <p className="text-secondary">
                                              {item.desc}
                                          </p>
                                        </details>
                                    </li>
                                  </ul>
                              </div>
                              <div className="card-footer">
                                  {
                                     currentUser.role === "user" ? <button onClick={() => bookingHandler(item)} className="btn btn-outline-success">Book Appointment</button> : null 
                                  }
                              </div>
                            </div>
                        </div>
                      )
                 })
              }
          </div>
        </div>
    </section>
  )
}

export default Home
