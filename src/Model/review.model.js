const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    comment:{type: String, max: 1000},
    rating:{type: Number}
});


// Export the model
module.exports = mongoose.model('Review', ReviewSchema);