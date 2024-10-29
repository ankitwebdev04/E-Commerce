var mongoose=require("mongoose");
const Schema=mongoose.Schema;
var Admin=new Schema({
    Adminid:{type:String},
    Adminpass:{type:String},
    Adminname:{type:String},
    Aaddress:{type:String},
    Acontact:{type:Number},
    Aemail:{type:String},
    Apicname:{type:String},
    Aid:{type:Number},
},
{
    collection:"Admin"
});
module.exports=mongoose.model("Admin",Admin);

