import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams,useNavigate} from "react-router-dom";


const UpdateProduct =()=> {
    const usersId = JSON.parse(localStorage.getItem('user-info'))._id;
    const [data, setData] = useState({name: '',price: '',category: '',company: '', userId: usersId });
    const params = useParams();

    const apiUrl = "http://localhost:5000/products/" + params.id;
    const navigate = useNavigate(); 


    useEffect(()=>{
      getproduct();
    },[])

    const getproduct = async () => {
      let result = await axios.get(apiUrl);
      result = result.data;
     //console.log(result);
     setData({ ...data, name: result.name, price: result.price,category: result.category,company: result.company });
  }




    const handleUpdateProduct = async (e)=> {
        e.preventDefault();
        //console.log(data);
        let result = await axios.put(apiUrl, data);
        //console.log(result.data);
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
                  <h1 className="h4 text-gray-900 mb-4">Update Product</h1>  
                </div>  
                <form onSubmit={handleUpdateProduct} className="user"> 
                  <div className="form-group row">  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="name" onChange={onChange} value={data.name} placeholder="Product Name" />  
                    </div> 
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="price" onChange={onChange} value={data.price} placeholder="Product price" />  
                    </div>  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="category" onChange={onChange} value={data.category} placeholder="Product category" />  
                      
                    </div>  
                    <div className="col-sm-12 mb-3 mb-sm-3">  
                      <input type="text" className="form-control" name="company" onChange={onChange} value={data.company} placeholder="Product company" />  
                    </div> 
                  </div>  
                   
                  <button type="submit" className="btn btn-primary  btn-block">  
                    Update Product
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

export default UpdateProduct;