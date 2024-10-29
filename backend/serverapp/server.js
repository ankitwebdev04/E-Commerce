const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const PORT=9191;
const cors=require("cors");
const mongoose=require("mongoose");
const config=require("./DB.js");
const stateRoute=require("./admin/state.route.js");
const cityRoute=require("./admin/city.route.js");
const productCatgRoute=require("./admin/productcatg.route.js");
const productRoute=require("./product/product.route.js");
const customerRoute=require("./customer/customer.route.js");
const route=require("./payment.js")
const venderRoute=require("./vendor/vender.route.js");
const adminRoute=require("./admin/adminroute.js");
const billRoute=require("./admin/bills/bill.route.js");
const paymentdetailsroute=require("./admin/bills/paymentdetails.route.js");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/state',stateRoute);
app.use('/city',cityRoute);
app.use('/productcatg',productCatgRoute);
app.use('/product',productRoute);
app.use('/customer',customerRoute);
app.use("/payment",route);
app.use("/vendor",venderRoute);
app.use("/admin",adminRoute);
app.use("/bill",billRoute);
app.use("/PaymentDetails",paymentdetailsroute);

mongoose.connect(config.URL,
    {useNewUrlParser:true}).then(
        ()=>{console.log("Database is connected"+config.URL)},
        err =>{console.log("Cannot connect to the databse"+err)}
    );
    app.listen(PORT,function(){
        console.log('Server is running on PORT:',PORT);
    });