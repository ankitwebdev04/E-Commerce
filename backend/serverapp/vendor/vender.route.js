const express=require('express');
const venderRoute=express.Router();
const bodyparser=require('body-parser');
const Vender=require("./vender.model");
var fs=require("fs");
const multer=require('multer');

//Vender registration Code
venderRoute.route("/register").post((req,res)=>{
    var vender=new Vender(req.body);
    vender.save().then(vender =>{
        if(vender!=null)
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
    venderRoute.route
    ("/login").post((req,res)=>{
        var id=req.body.VUserId;
        var pass=req.body.VUserPass;

        Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass},
            {"Status":"Active"}]}).then(vender=>{
            res.send(vender);
            res.end();
        }).catch(err=>{
            res.send("Something went wrong");
            res.end();
        });
    });
    //get image
    venderRoute.route(
    '/getimage/:vpicname').get((req,res)=>{
        var path=("C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/vendor/venderimages/")
        res.sendFile(path+req.params.vpicname);
    });

    //image save
    const st=multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,"C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/vendor/venderimages/")
        },
        filename:(req, file, cb)=>{                 
            cb(null, file.originalname)
        },
    })
    const upload = multer({ storage: st});

    venderRoute.post('/savevenderimage',upload.single('file'),
(req, res)=> {  
    // console.log("aya");
    res.json({})
})
//get vender for count
    venderRoute.route("/getvendercount").get((req,res)=>{
        Vender.find().then(vender =>{   
            res.send(vender);
            res.end();
        }).catch(err =>{
            res.send("something went wrong");
            res.end();
        })
    });
   //enable disable vender by admin

   venderRoute.route
   ("/vendermanage/:vid/:status").put((req, res) => {
    Vender.updateOne({"Vid":req.params.vid},{"Status":req.params.status})
    .then(Vender => {
        res.send("Vender Status Updated Successfully");
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
   });

    module.exports =venderRoute;

