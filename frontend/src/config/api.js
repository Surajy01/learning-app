import axios from "axios";

export const API=axios.create({
    baseURL:process.env.REACT_APP_SERVER
})

const AuthRoutes=["/users/login"]

API.interceptors.request.use(req=>{
    if(!AuthRoutes.includes(req.url)){
        req.headers= {
                 'Content-Type': 'application/json',
                 authorization: `Bearer ${localStorage.getItem('frontendtoken')}`
             }
    }
    return req

},(err)=>{
    Promise.reject(err)
})

