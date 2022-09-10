import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  


function Registers() {  
  const [data, setdata] = useState({ Name: '', Email: '', Password: '' }) 
  //const [userInvalid, setUserInvalid] = useState()
  console.log(data, 'Initial Data')

  const apiUrl = "http://localhost:5000/register"; 
  const navigate = useNavigate(); 

  useEffect(()=>{
    const auth = localStorage.getItem('user-info');
    if(auth)
      {
        navigate('/')
      }

  })




  const Registration = async (e)=> {  
  e.preventDefault();  
    //debugger;  
    const data1 = { name: data.Name, email: data.Email, password: data.Password };  
    console.log(data1, 'data1')

    let result = await  axios.post(apiUrl, data1)

    console.log(result.data, 'api res'); 

       if (result.data == '0') {  
          alert('Invalid User'); 
          console.log('That user already exisits!');
        } else { 
          console.log("sign up successfully");
          localStorage.setItem('user-info',JSON.stringify(result.data));
          navigate('/add');
        }
          
  }  
  const onChange = (e) => {  
    e.persist();  
    //debugger;  
    setdata({ ...data, [e.target.name]: e.target.value });  
  }  
  return (  
    <div className="container"> 
    <h1 className='text-center mt-4'>Register</h1>  
      <div className="row">  
        {/* <div className="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
          Add New Contact  
       </div>   */}
      </div>  
      <div className="card o-hidden border-0 shadow-lg my-5 w-50 mx-auto" style={{ "marginTop": "5rem!important;" }}>  
        <div className="card-body p-0"> 
          <div className="row">  
            <div className="col-lg-12">  
              <div className="p-5">  
                <div className="text-center">  
                  <h1 className="h4 text-gray-900 mb-4">Create a New User</h1>  
                </div>  
                <form onSubmit={Registration} className="user"> 
                  {/* <p className='text-danger '>{userInvalid}</p>  */}
                  <div className="form-group row">  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" name="Name" onChange={onChange} value={data.Name} className="form-control" id="Name" placeholder="Name" required/>  
                    </div> 
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="email" name="Email" onChange={onChange} value={data.Email} className="form-control" id="Email" placeholder="Email" required/>  
                    </div>  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="Password" name="Password" onChange={onChange} value={data.Password} className="form-control" id="Password" placeholder="Password" required/>  
                    </div>  
                  </div>  
                   
                  <button type="submit" className="btn btn-primary  btn-block">  
                    Create User  
                  </button>  
                </form>  
              
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  )  
}  
  
export default Registers;