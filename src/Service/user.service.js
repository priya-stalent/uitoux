const httpStatus = require('http-status');
const  User = require('../Model/user.model');
const Review = require('../Model/review.model');
const Product = require('../Model/product.model');
const Cart = require('../Model/cart.model');
const Sales = require('../Model/sales.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const createUser = async (body) => {
    let user = new User(body
    );

    const result =await user.save();
    return result;
};

const login = async(body)=>{
       const user = await User.findOne({email:body.email})
       console.log(await user.isPasswordMatch(body.password));
       if (!user || !(await user.isPasswordMatch(body.password))) {
        return ({message:'Incorrect username or password'});
      }else{
       
        return user;
      }
}

const addReview = async(body,user)=>{
  let payload = {
    userId:user.id,
    comment:body.comment,
    productId:ObjectId(body.productId),
    rating:body.rating
  }
  let review = new Review(payload);
  const result= await review.save();
  const allreviews = await Review.find({productId:ObjectId(body.productId)})
  let fiveStarCount=0;
  let fourStarCount =0;
  let threeStarCount=0;
  let twoStarCount=0;
  let oneStarCount= 0;
  allreviews.forEach(element => {
    console.log(element.rating)
    if(element.rating == 5){
      fiveStarCount++;
    }
    if(element.rating == 4){
      fourStarCount++;
    }
    if(element.rating == 3){
      threeStarCount++;
    }
    if(element.rating == 2){
      twoStarCount++;
    }
    if(element.rating == 1){
      oneStarCount++;
    }
   
  });
  let rating = (((fiveStarCount *5) + (fourStarCount*4) + (threeStarCount*3)+ (twoStarCount*2) +(oneStarCount *1))/allreviews.length).toFixed(1);
  const filter = { _id:ObjectId(body.productId) };
  const update = { rating: rating };
let doc = await Product.findOneAndUpdate(filter, update);
  return result;
}


const addToCart = async(body,user)=>{
  let payload = {
    userId:user.id
  };
  let resultList=[];
  if(body.productList.length >0){
   
    for(const element of body.productList){
      let proCheck = await Cart.findOne({productId:ObjectId(element.productId)})
      if(proCheck){
        const filter = { productId:ObjectId(element.productId) };
        const update = { quantity: element.quantity };
      let doc = await Cart.findOneAndUpdate(filter, update);
      proCheck.quantity = element.quantity;
      if(doc)
      resultList.push(proCheck);
      }
      else{
        payload.productId = element.productId;
        payload.quantity= element.quantity
        let proCart = new Cart(payload);
        let rr=await proCart.save();
        resultList.push(rr);
      }
     
    }
   
    if(resultList.length > 0)
    return ({message:"Added to Cart"})
  }
  else
  return {message:"No Products to add"}
}

const getUserCart = async(user)=>{
   let cartValue=0;
   let productList=[];
   let result={};
   const userCartList = await Cart.find({userId:user.id,status:true}) .populate({ path: 'productId', select: 'name price' });
   for(const item of userCartList){
   cartValue = cartValue + item.quantity * item.productId.price;
   productList.push({
    id:item.id,
    userId : item.userId,
    productId : item.productId._id,
    productName : item.productId.name,
    price : item.productId.price,
    quantity: item.quantity
   })
   }
   result.cartValue = cartValue;
   result.productList = productList
   return ({message:"Fetched successfully",result:result})
};

const buyNow = async(user,body)=>{
body.userId = user.Id;
if(body.paymentType == "COD"){
  body.paymentStatus = "pending"
}
else{
  body.paymentStatus = "completed"
}
let sales = new Sales(body);
let result = sales.save();
if(result){
  for(let item of body.cartList){
    const filter = { _id:ObjectId(item) };
    const update = { status: false };
    let doc = await Cart.findOneAndUpdate(filter, update);
  }
  return result;
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