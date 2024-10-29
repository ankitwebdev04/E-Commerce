const express=require('express');
const productRoute=express.Router();
let Product=require('./product.model');
const multer=require('multer');

//save Product
productRoute.route
('/saveproduct').post(function (req,res) {
    let product=new Product(req.body);
    console.log(product)
    product.save().then(product => {
        res.send("Product added Successfully");
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});
// get product all  
productRoute.route
('/showproduct').get(function (req, res) {
    Product.find().then(product => {
        console.log(product);
        res.send(product);
    }).catch(err => {
        res.status(400).send("Data not found something went wrong");
    });
});
//get product count for id
productRoute.route
('/getmaxpid').get(function (req, res) {
    Product.find().then(product => {
        console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err => {
        res.status(400).send("Data not found something went wrong");
    });
});
// save product Image
const stv=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/product/productimages")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const uploadv = multer({ storage: stv });
productRoute.post('/saveproductimage',uploadv.single
    ('file'), (req, res) =>{
        res.send("Upload Success");
        res.end();
    }
);
// get product image
productRoute.route
('/getproductimage/:picname').
get((req, res) => {
    var path=("C:/Users/hp/OneDrive/Desktop/ECommerce Project/backend/serverapp/product/productimages/");
    res.sendFile(path+req.params.picname);
});

//get product by vender

productRoute.route("/showproductbyvender/:vid").get(function (req, res) {
    Product.find({"vid":req.params.vid})
    .then(product => {
        console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err => {
        res.status(400).send("Data not found something went wrong");
    });
});

// get product by category
productRoute.route(
    "/showproductbycatgid/:pcatgid").get(function (req, res){
        Product.find({"pcatgid":req.params.pcatgid})
        .then(product => {
            console.log(product);
            res.send(product);
            res.end();
        }).catch(err => {
            res.send(err);
        });
    });
module.exports=productRoute; 