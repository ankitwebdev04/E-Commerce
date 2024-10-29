const express = require ("express");
const paymentdetailsroute = express.Router();
let PaymentDetails = require('./paymentdetails.model');

//Save Payment Details
paymentdetailsroute.route('/paymentdetailsave').post((req, res)=>{
    let paymentdetails = new PaymentDetails(req.body);

    paymentdetails.save().then(bill => {
        res.send("Payment Details Saved Successfully");
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

// Get Payment Details
paymentdetailsroute.route('/showpaymentdetails').get((req, res) => {
    PaymentDetails.find().then(pd => {
        res.send(pd);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });
});
module.exports = paymentdetailsroute;