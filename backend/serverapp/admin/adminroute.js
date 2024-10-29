const express=require("express");
const adminRoute=express.Router();
const bodyparser=require("body-parser");
const Admin=require("./admin.model.js");
var fs=require("fs");
const multer=require("multer");

//Admin registration code
adminRoute.route
("/register").post((req,res)=>{
    var admin=new Admin(req.body);
    admin.save().then(admin=>{
        if(admin!=null)
        {
            res.send("Registration Successfull");
        }
        else{
            res.send("Registration failed");
        }
    }).catch((err)=>{
        res.send("Registration Failed");
    });
});

//Admin Login code
adminRoute.route("/login").post((req,res)=>{
    var id=req.body.Adminid;
    var pass=req.body.Adminpass;
    Admin.findOne({$and:[{"Adminid":id},{"Adminpass":pass}]}).then(admin=>{
        console.log(admin);
        res.send(admin);
        res.end();
    }).catch(err => {
        res.send("Something Went Wrong");
        res.send();
    });
}) ;

// getimage
adminRoute.route("/getimage/:apicname").get((req,res)=>{
    res.sendFile("C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/admin/adminimages/"
        +req.params.apicname);
});

//image save
const st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/admin/adminimages/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload=multer({storage:st})
adminRoute.post("/saveadminimage",upload.single("file"),(req,res)=>{
    res.json({})
})

module.exports=adminRoute;