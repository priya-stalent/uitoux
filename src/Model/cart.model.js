const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        default :1
    },
    status:{
        type:Boolean,
        default:true
    }
});


// Export the model
module.exports = mongoose.model('Cart', CartSchema);