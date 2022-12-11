import axios from "axios";
import { My_Url } from "./Url";

// let token=localStorage.getItem('_token');

export function addSignup(data){
    return axios.post(`${My_Url}signup`,data)
}
export function login(data){
    return axios.post(`${My_Url}login`,data)
}
export function getUsers(){
    return axios.get(`${My_Url}user`)
}

export function getPizzaData(){
    return axios.get(`${My_Url}pizzadata`)
}
export function checkoutOrder(data){
    return axios.post(`${My_Url}checkout`,data)
}
export function getOrders(){
    return axios.get(`${My_Url}getorders`)
}

export function getSingleUser(email){
    return axios.get(`${My_Url}user/${email}`)
}

export function updateProfile(id,data){
    return axios.put(`${My_Url}updateuser/${id}`,data)
}
export function deleteUser(index){
    return axios.delete(`${My_Url}deleteuser/${index}`)
}


// export function getPizzaData(){
//     return axios.get(`${My_Url}pizzadata`,{
//         headers:{"authorization":`Bearer ${token}`}
//     })
// }
