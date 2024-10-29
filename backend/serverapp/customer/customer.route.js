const express=require('express');
const customerRoute=express.Router();
const bodyparser=require('body-parser');
const Customer=require("./customer.model");
var fs=require("fs");
const multer=require('multer');

//Customer registration Code
customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(customer =>{
        if(customer!=null)
        {
            res.send("Registration Successfull");
        }     
        else{
            res.send("registration failed");
        }
    }).catch (err=>{
        res.send("Registration Failed");
    });
    });
    //login
    customerRoute.route
    ("/login").post((req,res)=>{
        var id=req.body.CUserId;
        var pass=req.body.CUserPass;

        Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]}).then(customer=>{
            res.send(customer);
            res.end();
        }).catch(err=>{
            res.send("Something went wrong");
            res.end();
        });
    });
    //get image
customerRoute.route(
    '/getimage/:cpicname').get((req,res)=>{
        var path=("C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/customer/customerimage/")
        res.sendFile(path+req.params.cpicname);
    });

    //image save
    const st=multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,"C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/customer/customerimage/")
        },
        filename:(req, file, cb)=>{                 
            cb(null, file.originalname)
        },
    })
    const upload = multer({ storage: st});

    customerRoute.post('/savecustomerimage',upload.single('file'),
(req, res)=> {
    console.log("aya");
    res.json({})
})
//get customer for count
    customerRoute.route("/getcustomercount").get((req,res)=>{
        Customer.find().then(customer =>{   
            res.send(customer);
            res.end();
        }).catch(err =>{
            res.send("something went wrong");
            res.end();
        })
    });
    //get customer details by id 
    customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
        var id=req.params.cid;
        Customer.findOne({"Cid":id}).then(customer =>{
            console.log(customer);
            res.send(customer);
            res.end();
        }).catch(err =>{
            res.send("Something went wrong");
            res.end();
        })
    })

    //get customer list
    customerRoute.route("/getcustomerlist").get((req,res)=>{
        var id=req.params.cid;
        Customer.find().then(customer => {
            console.log(customer);
            res.send(customer);
            res.end();
        }).catch(err => {
            res.send("Something Went Wrong");
            res.end();
        })
    })
    module.exports =customerRoute;

