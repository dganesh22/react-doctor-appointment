import React, { useContext } from 'react'
import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRouter from './PrivateRoute/PrivateRouter'
import { AuthContext } from './Context/AuthContext'

import { ToastContainer } from 'react-toastify'

import Menu from './component/Default/Menu'
import Home from './component/Default/Home'
import Contact from './component/Default/Contact'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import Services from './component/Default/Services'
import Pnf from './component/Default/Pnf'
import AdminDashboard from './component/Admin/AdminDashboard'
import DoctorDashboard from './component/Doctor/DoctorDashboard'
import UserDashboard from './component/User/UserDashboard'
import About from './component/Default/About'
import UnAuthorized from './component/Default/UnAuthorized'
import UserProfile from './component/User/UserProfile'
import AdminProfile from './component/Admin/AdminProfile'
import DoctorProfile from './component/Doctor/DoctorProfile'
import Slots from './component/Doctor/slots/Slots'
import AddSlot from './component/Doctor/slots/AddSlot'
import UpdateSlot from './component/Doctor/slots/UpdateSlot'
import ServiceList from './component/Doctor/service/ServiceList'
import AddService from './component/Doctor/service/AddService'
import UpdateService from './component/Doctor/service/UpdateService'
import AllUsers from './component/Admin/AllUsers'
import UpdateUserInfo from './component/Admin/UpdateUserInfo'
import AllDoctors from './component/Admin/AllDoctors'
import AddDoctor from './component/Admin/AddDoctor'
import UserAppointment from './component/User/UserAppointment'
import AppList from './component/Doctor/appointment/App_List'


function App() {
  const context = useContext(AuthContext)
  const token = context.token
  const isUser = context.isUser
  const isAdmin = context.isAdmin
  const isDoctor = context.isDoctor

  return (
    <Router>
        <Menu/>
        <ToastContainer autoClose={4000} position={'top-right'} />
        <Routes>
            <Route element={<PrivateRouter/>} >
                <Route path={`/`} element={<Home/>} />
                <Route path={`/about`} element={<About/>} />
              {
                isUser && token ? (
                    <React.Fragment>
                          <Route path={`/services`} element={<Services/>} />
                          <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                          <Route path={`/user/appointments`} element={<UserAppointment/>} />
                          <Route path={`/user/profile`} element={<UserProfile/>} />
                    </React.Fragment>
                ) : null
              }

              {
                isAdmin && token ? (
                  <React.Fragment>
                    <Route path={`/admin/dashboard`} element={<AdminDashboard/>} />
                    <Route path={`/admin/users/all`} element={<AllUsers/>} />
                    <Route path={`/admin/doctors/all`} element={<AllDoctors/>} />
                    <Route path={`/admin/add/doctor`} element={<AddDoctor/>} />
                    <Route path={`/admin/users/edit/:id`} element={<UpdateUserInfo/>} />
                    <Route path={`/admin/profile`} element={<AdminProfile/>} />
                  </React.Fragment>
                ): null
              }

              {
                isDoctor && token ? (
                  <React.Fragment>
                     <Route path={`/doctor/dashboard`} element={<DoctorDashboard/>} />
                     <Route path={`/doctor/slots`} element={<Slots/>} />
                     <Route path={`/doctor/appointments/all`} element={<AppList/>} />
                     <Route path={`/doctor/slots/add`} element={<AddSlot/>} />
                     <Route path={`/doctor/slots/edit/:id`} element={<UpdateSlot/>} />
                     <Route path={`/doctor/service`} element={<ServiceList/>} />
                     <Route path={`/doctor/service/add`} element={<AddService/>} />
                     <Route path={`/doctor/service/edit/:id`} element={<UpdateService/>} />
                     <Route path={`/doctor/profile`} element={<DoctorProfile/>} />
                  </React.Fragment>
                ): null
              }
            </Route>
            
            <Route path={`/contact`} element={<Contact/>} />
            <Route path={`/register`} element={<Register/>} />
            <Route path={`/login`} element={token ?  <Navigate to={`/`}/> : <Login/> } />
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </Router>
  )
}

export default App
