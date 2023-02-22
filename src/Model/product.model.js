const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    code:{type: String, required: true,unique: true,},
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    category:{type: String, max: 100},
    rating:{type: Number},
    isOfferApply:{type:Boolean,default:false}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);