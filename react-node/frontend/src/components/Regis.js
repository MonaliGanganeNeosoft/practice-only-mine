import React,{useState} from 'react'
import { regis } from '../config/Myservice';
export default function Regis() {
    const [state,setState]=useState({email:'',password:'',name:'',age:''});
    const handler=(event)=>{
        const{name,value}=event.target;
        setState({...state,[name]:value})
    }
    const postRegis=(event)=>{
        event.preventDefault();
        regis(state)
        .then(res=>{
            if(res.data.err==0){
                console.log(res.data)
            }
            if(res.data.err==1){
                console.log(res.data)
            }
        })
    }
    return (
        <div>
            <h2>Regis here</h2>
            <form method="post" onSubmit={postRegis}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handler}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handler}/>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange={handler}/>
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" className="form-control" onChange={handler}/>
                </div>
               
                <input type="submit" value="Regis" className="btn btn-success"/>
            </form>
        </div>
    )
}
