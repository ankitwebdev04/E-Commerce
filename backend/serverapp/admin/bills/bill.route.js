const express = require('express');
const billRoute = express.Router();
let Bill = require('./bill.model');

// Save Bill
billRoute.route('/billsave').post((req, res) => {
    let bill = new Bill(req.body);

    bill.save().then(bill => {
        res.send({'bill':
            'Bill Added Successfully'
        });
    }).catch(err => {
        res.send(err);
    });
});

//Show All Bill By Customer Id
billRoute.route
('/billsshow/:cid').get((req, res) => {
    Bill.find({"cid":req.params.cid})
    .then(bill => {
        res.send(bill);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

billRoute.route
('/billshowbillids/:cid').get((req, res) =>{
    Bill.distinct("billid",{"cid":req.params.cid}).then(bill => {
        res.send(bill);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

//Get Id Of Last Entered Bill To Generate ID For Next Bill 
billRoute.route
('/getbillid').get((req, res) => {
    Bill.find().sort({"billid":-1}).limit(1).then(bill => {
        console.log(bill);
        res.send(bill);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

// Get Bill Details By Bill Id
billRoute.route
('/showbillbyid/:billid').get((req, res) =>{
    Bill.find({"billid":req.params.billid}).then(bill =>{
        res.send(bill);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});
module.exports = billRoute; 