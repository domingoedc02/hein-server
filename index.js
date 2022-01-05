
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

dotenv.config();

const userRoutes = require("./Routes/userRoute");
const orderRoutes = require('./Routes/orderRoute');




mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));



/*Middlewares*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())


/*Routes*/ 
app.use(userRoutes);
app.use(orderRoutes);



app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

