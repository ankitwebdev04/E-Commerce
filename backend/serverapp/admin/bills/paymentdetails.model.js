var mongoose = require ("mongoose");
const Schema = mongoose.Schema;
var PaymentDetails = new Schema({
    orderCreationId:{type:String},
    razorpayPaymentId:{type:String},
    razorPayOrderId:{type:String},
    razorPaySignature:{type:String},
    cid:{type:Number},
    billid:{type:Number},
    amount:{type:Number}
},
{
    collection:"PaymentDetails"
}
);
module.exports = mongoose.model("PaymentDetails",PaymentDetails);