import axios from "axios";
 
import { MAIN_URL } from "./Url";
let token=localStorage.getItem('_token');
export function getPosts(){
    return axios.get(`${MAIN_URL}posts/fetchpost`,{
        headers:{"Authorization":`Bearer ${token}`}
    });
}
export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
export function regis(data){
    return axios.post(`${MAIN_URL}posts/regis`,data);
}
export function login(data){
    return axios.post(`${MAIN_URL}posts/login`,data);
}
