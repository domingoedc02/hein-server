
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

dotenv.config();

const userRoutes = require("./Routes/userRoute");
const orderRoutes = require('./Routes/orderRoute');
const productsRoutes = require('./Routes/productRoute') 




mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));



/*Middlewares*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())


/*Routes*/ 
app.use("/users",userRoutes);
app.use("/order",orderRoutes);
app.use("/product", productsRoutes)



app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

