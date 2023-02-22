const express = require('express');
const bodyParser  = require('body-parser');
const user = require('./Routes/user.route');
const product = require('./Routes/product.route');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/product_sale';
var passport  = require('passport');

var  options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// jwt authentication
app.use(passport.initialize());

// include passport stratagy
require("./config/passport").usersAuth(passport)


app.use('/user', user);
app.use('/product', product);
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));