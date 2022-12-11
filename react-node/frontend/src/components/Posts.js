import React,{useState,useEffect} from 'react';
import { getPosts } from '../config/Myservice';
import jwt_decode from 'jwt-decode';
export default function Posts() {
    const [postdata,setPostdata]=useState([]);
    const [uid,setUid]=useState('')
    useEffect(()=>{
       
       if(localStorage.getItem('_token')!=undefined){
           let token=localStorage.getItem('_token');
           let decode=jwt_decode(token);
           console.log(decode);
           setUid(decode.uid)
           getPosts()
       .then(res=>{
           console.log(res.data);
           if(res.data.err==0){
               setPostdata(res.data.pdata);
           }
       })
       }
    },[])
    return (
        <>
            <section className="container">
                <h2> Latest Posts  {uid}</h2>
                {postdata.map(val=>
                    <p>{val.pname}</p>
                   
                )}
            </section>
        </>
    )
}
