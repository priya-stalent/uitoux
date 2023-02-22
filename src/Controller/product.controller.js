const httpStatus = require('http-status');
const  Product = require('../Service/product.service');


const createProduct = async (req, res) => {
    try{
     let body = {
        name:req.body.name,
        code:req.body.code,
        category:req.body.category,
        price:req.body.price,
        rating:req.body.rating,
        isOfferApply:body.isOfferApply
     }
     const result = await Product.createProduct(body);
    
     if(result){
       
        res.send("Product added successfully");
     }
     else{
        res.send("Error in adding the product");
     }
    }catch(ex){
        res.send("Error in adding the product",ex);
    }
  };

  const updateProduct = async (req, res) => {
   try{
    const result = await Product.updateProduct(req.body);
   
    if(result){
      
       res.send("Product updated successfully");
    }
    else{
       res.send("Error in adding the product");
    }
   }catch(ex){
       res.send("Error in adding the product",ex);
   }
 };

  const getProduct = async(req,res)=>{
     try{
      const result = await Product.getProductList();
      res.send({message:"Product fetched successfully",result:result});
     }catch(ex){
      res.send("Error in fetching the product",ex);
     }
  };

  const getTopRated = async (req,res) => {
   try{
      const result = await Product.getTopRated();
      res.send({message:"Product fetched successfully",result:result});
     }catch(ex){
      res.send("Error in fetching the product",ex);
     }
 };

  module.exports = {
    createProduct,
    getProduct,
    getTopRated,
    updateProduct
  }