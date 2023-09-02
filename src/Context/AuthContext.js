import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = "https://doctor-appointment-booking-wgv0.onrender.com"

export const AuthContext = createContext()

function AuthProvider(props) {
    const [currentUser, setCurrentUser ] = useState(null)
    const [token,setToken] = useState(false)
    const [pending,setPending] = useState(false)

    /* states to handle roles */
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser,setIsUser] = useState(false)
    const [isDoctor,setIsDoctor] = useState(false)

    const loginStatus = JSON.parse(localStorage.getItem("loginStatus"))

    const initAuth = useCallback(() => {
        const getAuth = async () => {
            const res = await axios.get(`${URL}/api/auth/getToken`)
            
                if(res) {
                    setToken(res.data.accessToken)
                    await axios.get(`${URL}/api/auth/logged/user`, {
                        headers: {
                            Authorization: `${res.data.accessToken}`
                        }
                    }).then(res => {
                        setCurrentUser(res.data.user)
                        let user = res.data.user
                            if(user.role === "superadmin") {
                                setIsAdmin(true)
                            } else if (user.role === "user") {
                                setIsUser(true)
                            } else if (user.role === "doctor") {
                                setIsDoctor(true)
                            } else {
                                setIsAdmin(false)
                                setIsUser(false)
                                setIsDoctor(false)
                            }
                    }).catch(err => toast.error(err.response.data.msg))
                       
                    setPending(false)
                } else {
                    setToken(false)
                    setPending(true)
                }
        }

        getAuth()
    }, [token])

    useEffect(() => {
        if(loginStatus) {
            initAuth()
        }
    },[initAuth, token])

    if(pending) {
        return (
            <div className="spinner-border text-success" role='status'>
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

  return (
    <AuthContext.Provider value={{ currentUser, token, isAdmin, isUser, isDoctor }} >
            { props.children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
