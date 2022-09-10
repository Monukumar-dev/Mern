import "bootstrap/dist/css/bootstrap.css";
import Header from './components/Header';
import Login from './components/Login';
import Registers from './components/Registers';
import AddProduct from "./components/AddProduct";
import Products from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import {BrowserRouter,Routes, Route,} from "react-router-dom";
import PrivateComponent from './components/PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />} >
              <Route path="/" element={<Products />} />
              <Route path="/add" element={<AddProduct />} /> 
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registers />} />
          <Route path="/logout" element={<h1> Logout </h1>} />
        </Routes>
      </BrowserRouter>
  
    </div> 
  );
}

export default App;
