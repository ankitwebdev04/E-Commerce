const express=require('express');
const ProductCatgRoute=express.Router();
let ProductCatg=require('./productcatg.model');

//save product category code
ProductCatgRoute.route
('/addproductcatg/:pcatgid/:pcatgname').
post(function(req, res) {
    var productcatg=new ProductCatg({pcatgid:req.params.pcatgid,pcatgname:req.
        params.pcatgname});

    productcatg.save().then(productcatg =>{
        res.send("Product Category Added Successfully");
        res.end();
    }).catch(err => {
        res.status(400).send
        ("Unable to Save to Database");
        res.end();
    });
});

 // show all Product Category
 ProductCatgRoute.route
 ('/showproductcatg').get(function (req, res){
    ProductCatg.find()
    .then(productcatg =>{
        res.send(productcatg);
        res.end();
    }).catch(err =>{
        res.send("Data not found Something Went Wrong");
    });
 });

//  // update product category by Id
//  ProductCatgRoute.route
//  ("/update").put(function (req,res){
//      ProductCatg.updateOne({"pcatgid":req.body.pcatgid},{"pcatgid":req.body.pcatgid,"pcatgname":req.body.pcatgname}).then(productcatg=>{
//          res.send("updated");
//          res.end();
//      }).catch(err=>{
//          res.send(err);
//          res.end();
//      });
//  });
// Search product by Category ID
 ProductCatgRoute.route
("/search/:pcatgid").get((req,res)=>{
    // console.log(pcatgid);
    ProductCatg.findOne({"pcatgid":req.params.pcatgid}).then(productcatg =>{
        console.log(pcatgid);
        res.send(productcatg);
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});
ProductCatgRoute.route
("/searchbyi/:pcatgid").get((req,res)=>{
    console.log(req.params.pcatgid);
    
    ProductCatg.findOne({"pcatgid":req.params.pcatgid}).then((pcatgid) =>{
        
        res.send(pcatgid);
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});

ProductCatgRoute.route
("/searchbyname/:pcatgname").get((req,res)=>{
    ProductCatg.findOne({"pcatgname":req.params.pcatgname}).then(pcatgname=>{
        res.send(pcatgname);
        res.end();
    }).catch(err=>{
        res.send(err);
    });
});

  module.exports=ProductCatgRoute;