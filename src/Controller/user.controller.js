
const  User = require('../Service/user.service');
const UserModel = require('../Model/user.model')
const createUser = async (req, res) => {
    let user = 
        {
            firstName: req.body.firstName ? req.body.firstName:"",
            middleName: req.body.middleName ?req.body.middleName:"",
            lastName:req.body.lastName ?req.body.lastName:"",
            mobile:req.body.mobile?req.body.mobile:"",
            sex:req.body.sex?req.body.sex:"",
            username:req.body.username?req.body.username:"",
            email:req.body.email?req.body.email:"",
            password:req.body.password?req.body.password:"",
            address:req.body.address?req.body.address:"",
            city:req.body.city?req.body.city:"",
            state:req.body.state?req.body.state:"",
            country:req.body.country?req.body.country:"",
            pincode:req.body.pincode?req.body.pincode:"",
        }
   
        const result = await User.createUser(user);
    
        if(result){
          
           res.send("Product added successfully");
        }
        else{
           res.send("Error in adding the product");
        }
  };


  const login = async(req,res)=>{
    const email = req.body.email ? req.body.email:"";
    const password = req.body.password;
    let body={};
    if(password == "" || password == null){
        res.send("Please enter the password")
    }
    if(email == ""){
        res.send("Please enter email id  for login")
    }
    body={
        email : email,
        password :password
    }
  
    const result = await User.login(body);
    if(result.message){
        res.send({message:"Incorrect username or password"});
    }
    else{
        let payloadData = {
            "_id": result._id
        }
        let token = new UserModel().generateJWT(payloadData);
        res.send({ result, token});
    }
    
  };

    const addReview = async(req,res)=>{
        try{
        const result = await User.addReview(req.body,req.user)
        res.send({result:result})
        }catch(ex){

            res.send("Error in adding the review",ex);
        }
    }

    const addToCart = async(req,res)=>{
        try{
            const result = await User.addToCart(req.body,req.user)
            if(result)
            res.send(result);
        }catch(ex){
                res.send("Error in adding the product to cart",ex);
        }
    };

    
    const getUserCart = async(req,res)=>{
        try{
            const result = await User.getUserCart(req.user)
            if(result)
            res.send(result);
        }catch(ex){
                res.send("Error in getting the products in cart",ex);
        }
    }; 

    const buyNow = async(req,res)=>{
        try{
            const result = await User.buyNow(req.user,req.body)
            if(result)
            res.send({message:"Product Purchased Successfully"});
        }catch(ex){
            res.send("Error",ex);
        }
    }

  module.exports = {
    createUser,
    login,
    addReview,
    addToCart,
    getUserCart,
    buyNow
  }