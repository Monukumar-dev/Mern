import React, { useEffect, useState } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function ProductList () {
    const [products, setProducts] = useState([]);

    const apiUrl = "http://localhost:5000/products"; 

    useEffect(()=> {
        getproduct();
    }, [])


    const getproduct = async () => {
        let result = await axios.get(apiUrl);
        result = result.data;
        setProducts(result);
    }
    //console.table(products);

    const deleteProduct = async (id) => {
        let result = await axios.delete(`${apiUrl}/${id}`);
         if (result) {
            //alert("product is deleted")
            getproduct();
         }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await axios.get(`http://localhost:5000/search/${key}`);
            if (result) {
                setProducts(result.data);
            }
        }else {
            getproduct();
        }
    }


    return(
        <div className="ProductList">
            <h1>Product List</h1>
            <input onChange={searchHandle} type="text" className="form-control mx-auto m-4 w-50" placeholder="Search Product" />
            
            <table>
                <tbody>
                <tr>
                    <th>Sr. no</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Action</th>
                </tr>
                {
                    products.length>0 ? products.map((item, index) => (
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.company}</td>
                            <td>
                                <button onClick={()=>deleteProduct(item._id)} className="btn btn-danger m-1">Delete</button>
                                <NavLink className="btn btn-primary" to={`/update/${item._id}`}>Update</NavLink>
                            </td>
                        </tr>
                      ))
                      :
                      <h3>No Data Found!</h3>   
                }
                </tbody>
            </table>
        </div>

    )
 
    

}

export default ProductList;