import React, { useContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'


function AddDoctor() {
    const [users,setUsers] = useState([])
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const token = context.token
    const currentUser = context.currentUser
    const [doctor,setDoctor] = useState({
            name: "",
            email: "",
            mobile: "",
            image: ""
    })
    const [doctorInfo,setDoctorInfo] = useState({
            doctorId: "",
            department: "",
            qualification: "",
            description: "",
            experience: 0
    })

    const readUser = useCallback(() => {
            const getUser = async () => {
                await axios.get(`/api/admin/all/reg/users`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(res => {
                    let doctors = res.data.users.filter(item => item.role === "doctor")
                    setUsers(doctors)
                }).catch(err => toast.error(err.response.data.msg))
            }
            getUser()
    },[])

    useEffect(() => {
        readUser()
    },[readUser])

    const readValue = (e) => {
        const { name, value } = e.target
         if(name === "name") {
            let fUser = users.find((item) => item.name === value);
            console.log('fUser=', fUser)
            setDoctor(fUser)
         } else {
            setDoctor({...doctor, [name]: value })
         }
       
    }

    const readDocValue = (e) => {
        const { name, value }= e.target;
        setDoctorInfo({...doctorInfo, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let data = {
            name: doctor.name,
            email: doctor.email,
            mobile: doctor.mobile,
            image: doctor.image,
            doctorId: doctorInfo.doctorId,
            department: doctorInfo.department,
            qualification: doctorInfo.qualification,
            experience: doctorInfo.experience,
            description: doctorInfo.description
        }
        console.log('doctor =', data)
        await axios.post(`/api/doctor/add`, data, {
            headers: {
                Authorization: `${token}`
            }
        }).then(res => {
            toast.success(res.data.msg);
            navigate(`/admin/doctors/all`)
        }).catch(err => toast.error(err.response.data.msg))
    }


  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Add New Doctor</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="name">Name</label>
                                <select name="name" id="name" value={doctor.name} onChange={readValue} className="form-select" required>
                                    <option value="null">Choose Name</option>
                                    <React.Fragment>
                                            {
                                                users && users.map((item,index) => {
                                                    return <option key={index} value={item.name}> {item.name} </option>
                                                })
                                            }
                                    </React.Fragment>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                               <input type="email" name="email" id="email" value={doctor.email} onChange={readValue} className="form-control" readOnly required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name="mobile" value={doctor.mobile} onChange={readValue} id="mobile" className="form-control" readOnly required />                              
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="doctorId">DoctorId</label>
                                <input type="text" name="doctorId" value={doctorInfo.doctorId} onChange={readDocValue} id="doctorId" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="department">Department</label>
                                <select name="department" value={doctorInfo.department} onChange={readDocValue} id="department" className="form-select" required>
                                    <option value="null">Choose Department</option>
                                    <option value="dental">Dental</option>
                                    <option value="ortho">Ortho</option>
                                    <option value="cardio">Cardio</option>
                                    <option value="neuro">Neuro</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="qualification">Qualification</label>
                                <input type="text" name="qualification" value={doctorInfo.qualification} onChange={readDocValue} id="qualification" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" value={doctorInfo.description} onChange={readDocValue} id="description" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="experience">Experience (years) </label>
                                <input type="number" name="experience" value={doctorInfo.experience} onChange={readDocValue} id="experience" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Add Doctor" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDoctor
