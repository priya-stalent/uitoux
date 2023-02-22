
const  Product = require('../Model/product.model');


const createProduct = async (body) => {
    let product = new Product(body);

    const result = product.save();
    return result;

  };

  const getProductList = async () => {
    const result = await Product.find();
    return result;
  };

  const getTopRated = async () => {
    const result = await Product.find().sort({rating:-1});
    return result;
  };

  const updateProduct = async (body) => {
    const filter = { _id:ObjectId(body.id) };
    const update = body;
    let doc = await Cart.findOneAndUpdate(filter, update);
    const result = await Product.find().sort({rating:-1});
    return result;
  };

  module.exports = {
    createProduct,
    getProductList,
    getTopRated,
    updateProduct
  }