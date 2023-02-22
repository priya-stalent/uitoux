const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SalesSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    cartList:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cart'
    }],
    totalPrice:{
        type: Number
    },
    paymentType:{
        type:String,
        required:true
    },
    transactionId:{
        type:String
    },
    paymentStatus:{
        type:String
    },
    deliveryAddress:{
        type:String,
        required:true
    }
});


// Export the model
module.exports = mongoose.model('Sales', SalesSchema);