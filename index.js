const express = require("express");
const app = express();
const {connection} = require("./config/db");
const { userRouter} = require("./controller/userRoute");
const { orderRouter} = require("./controller/orderRoute");
const { restaurantRouter} = require("./controller/restaurantRoute");
require("dotenv").config()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send({"mssg":"Welcome to Food Delivery App"})
})
app.use('/api',userRouter)
app.use('/api',orderRouter)
app.use('/api',restaurantRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})