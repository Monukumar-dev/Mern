import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import {Form, Button } from 'react-bootstrap';

function Login() {
  const [data, setdata] = useState({Email: '', Password: ''});
  //console.log(data, 'Incial Data');

  const apiUrl = "http://localhost:5000/login";
  const navigate = useNavigate(); 

  useEffect(()=>{
    const auth = localStorage.getItem('user-info');
    if (auth) {
      navigate('/')
    }
  },[])


  const handleLogin= async (e)=> {
      e.preventDefault();

      const data1 = {email: data.Email, password: data.Password};
      console.log(data1, 'Req Data');

      let result = await axios.post(apiUrl, data1);
      console.log(result.data, 'Resp Data');

      if (result.data.name) {
        console.log('User login Successfully'); 
        localStorage.setItem('user-info', JSON.stringify(result.data))
        navigate('/add')
      } else {
        console.log({Error: 'No User found'});
      }



  }

  const onChange = (e) => {  
    e.persist();  
    //debugger;  
    setdata({ ...data, [e.target.name]: e.target.value });  
  } 

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12 mx-auto">
            <h1 className="mt-5 text-center">Login Page</h1>
            <div className="card o-hidden border-0 shadow-lg my-5 w-50 mx-auto">
                <div className="card-body">
                  <form onSubmit={handleLogin} className="">
                          <lable>Email</lable> 
                          <input className="form-control" type="email" name="Email" value={data.Name} onChange={onChange} placeholder="enter email" required/>
                          
                          <lable className="mt-3 d-block">Password</lable> 
                          <input className="form-control" type="password" name="Password" value={data.Password} onChange={onChange} placeholder="enter password" required/>
                          <br />
                          <div className="text-end">
                              <input className="btn btn-primary" type="submit" value="Login" />
                          </div>
                  </form>
                 
                </div>
            </div>
        </div>
      </div>
    </div>
  ); 
}

export default Login;
