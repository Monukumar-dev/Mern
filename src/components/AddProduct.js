import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AddProduct =()=> {
    const usersId = JSON.parse(localStorage.getItem('user-info'))._id;
    const [data, setData] = useState({name: '',price: '',category: '',company: '', userId: usersId });
    const [error, setError] = useState(false);
    const navigate = useNavigate(); 
 
    //setData({ ...data, userId: usersId });
    //console.log(data);


    //console.log(data, 'Initial Data')

    const apiUrl = "http://localhost:5000/add-product";

    const handleAddProduct = async (e)=> {
        e.preventDefault();
        
        //console.log(data.name);
        if(!data.name || !data.price  || !data.category  || !data.company )
        {
          setError(true);
          return false;
        }
        
        //const data1 = data["userId"] = userId;
        let result = await axios.post(apiUrl, data);
        console.log(result.data, 'result');
        if (result) {
          alert("Product Added Successfully")
        }
        navigate('/');


    }

    const onChange = (e) => {  
        e.persist();  
        //debugger;  
        setData({ ...data, [e.target.name]: e.target.value });
      }  

    return(
        <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5 w-50 mx-auto" style={{ "marginTop": "5rem!important" }}>  
        <div className="card-body p-0"> 
          <div className="row">  
            <div className="col-lg-12">  
              <div className="p-5">  
                <div className="text-center">  
                  <h1 className="h4 text-gray-900 mb-4">Add Product</h1>  
                </div>  
                <form onSubmit={handleAddProduct} className="user"> 
                  <div className="form-group row">  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="name" onChange={onChange} value={data.name} placeholder="Product Name" />  
                      {error && !data.name && <span className="invalid">Please enter the  name</span> }
                    </div> 
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="price" onChange={onChange} value={data.price} placeholder="Product price" />  
                      {error && !data.price && <span className="invalid">Please enter the  price</span> }
                    </div>  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="category" onChange={onChange} value={data.category} placeholder="Product category" />  
                      {error && !data.category && <span className="invalid">Please enter the  category</span> }
                    </div>  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="company" onChange={onChange} value={data.company} placeholder="Product company" />  
                      {error && !data.company && <span className="invalid">Please enter the  company</span> }
                    </div> 
                  </div>  
                   
                  <button type="submit" className="btn btn-primary  btn-block">  
                    Add Product
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

export default AddProduct;