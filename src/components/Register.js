import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function Register () {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const history = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      signUp();
    } else {
      history('/login');
    }

  } 



async  function signUp(e) {
       e.preventDefault();
       let item = {name,email,password}
       console.warn(item)

    let result = await fetch("https://reqres.in/api/users",{
         method:'POST',
         body:JSON.stringify(item),
         headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }

       })
       result = await result.json()
       console.warn("result", result)
       localStorage.setItem("user-info", JSON.stringify(result))
       //history.push("/add")
       history('/add');

  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mx-auto">
            <h1 className="mt-5 text-center">Register Page</h1>
            <div className="card p-4 bg-light Login mt-2">
                <form>
                  <lable>Name</lable> 
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Enter Name" />

                  <lable className="mt-3 d-block">Email</lable> 
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email" />
                  
                  <lable className="mt-3 d-block">Password</lable> 
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                  <br />
                  <button onClick={handleSignup} className="btn btn-primary">Sign Up </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  ); 
}

export default Register;
