const express = require('express');
const cors =require('cors');
require('./db/config');
const User = require('./models/User');
const Product = require('./models/Product');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp) => {
    let user = new User(req.body);
     // Check if this user already exisits
     let userCheck = await User.findOne({ email: req.body.email });
     if (userCheck) {
         //return resp.status(400).send('0');
         return resp.send('0'); 
     } else {
         // Insert the new user if they do not exist yet
         let result = await user.save();
         result = result.toObject();
         delete result.password;
         resp.send(result);
     }

}); 

app.post("/login", async (req,resp)=> {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            resp.send({result : 'User Not Found!'});
        }
        
    } else {
        resp.send({result : 'User Not Found!'});
    }
})
app.post("/add-product", async (req, resp)=> {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

});

app.get("/products", async (req, resp)=> {
    let products = await Product.find();
    if (products.length>0) {
        resp.send(products)
    } else {
        resp.send({result:"No Products found!"})
    }
})
app.delete("/products/:id", async (req, resp)=> {
    //resp.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})
app.get("/products/:id", async (req, resp)=> {
    let result = await Product.findOne({_id:req.params.id});
    if (result) {
        resp.send(result);
    }else {
        resp.send({Error : "Product Not found"});
    }
}) 

app.put("/products/:id", async (req, resp)=> { 
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result);
})

app.get("/search/:key", async (req, resp)=> {
    let result = await Product.find({
        "$or" : [
           {name : {$regex: req.params.key}},
           {company : {$regex: req.params.key}},
           {category : {$regex: req.params.key}}
        ]
    })
    resp.send(result);
})

 app.get("/",(req,resp) => {
     resp.send("app is working");
 });

app.listen(5000)



