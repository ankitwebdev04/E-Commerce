/*npm install razorpay --save :-library provides payment gateway.
Payment gateway is used to implement online payment functionality.*/


import React,{useEffect ,useState} from "react";
import axios from "axios";

function Bill(props)
{
    const [mydate,setMyDate]=useState('');
    const [custdata,setCustData]=useState([]);
    const [cname,setCname]=useState('');
    const [caddress,setCAddress]=useState('');
    const [ccontact,setCContact]=useState('');
    const [sitems,setSItem]=useState([]);
    var total=0;
    var nextbillid="";
   
    useEffect(()=>
    {
        // alert("Props length="+props.data.selitems.length);

        for (var i=0 ;i<props.data.selitems.length;i++)
        {
           sitems.push(props.data.selitems[i]);
             
        }
        // alert ("item count in sitem="+sitems.length);
        axios.get("http://localhost:9191/customer/getcustomerdetails/"+props.data.Cid).then((res)=>
        {   
            setCname(res.data.CustomerName);
            setCAddress(res.data.CAddress);
            setCContact(res.data.CContact);
            mydateFun();

        }).catch((err)=>{
            alert(err);
        })
    },[]);

    function mydateFun()
    {
        const date =new Date();
        let day = date.getDate();
        let month= date.getMonth()+1;
        let year =date.getFullYear();
        let currentDate =`${day}-${month}-${year}`;
       // console.log(currentDate);
        setMyDate(currentDate);

    }
function loadScript(src)
{
    return new Promise((resolve)=>
    {
      const script =document.createElement('script');
      script.src=src;
      script.onload=()=>
      {
        resolve(true);
      };
      script.onerror=()=>
        {
          resolve(false);
        }
        document.body.appendChild(script);
    });
}
    function SaveBill()
    {
        // alert(sitems.length);
        var nextbillid="";
        axios.get("http://localhost:9191/bill/getbillid/").then((res) => {
            nextbillid=parseInt(res.data[0].billid)+1;
            
       
    
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        sitems.map((item)=>{
            // alert(item.pid)

            var billobj={

                billid:nextbillid,
                billdate:currentDate,
                cid:props.data.Cid,
                pid:item.pid,
            }
            axios.post("http://localhost:9191/bill/billsave",billobj).then((res) => {
                // alert(res.data);
            })
        }).catch((err)=>{
            // alert("inner"+err);
        });
    }).catch((err)=>{
        // alert("outer"+err);
    })
    }

async function displayRazorpay() {
    SaveBill();
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res)
    {
        alert("Razorpay SDK failed to load .Are you online ?");
        return ;
    }
    var myamount=total*100;
    //creating a new order 
    const result =await axios.post("http://localhost:9191/payment/orders/"+myamount);
    if (!result)
    {
        alert("server error.are you online ?");
        return;

    }
    //getting the order detAIL back
    const {amount ,id:order_id,currency}=result.data;
    const options={
        key:"rzp_test_8CxHBNuMQt1Qn8",// enter key id generated from the dashboard
        amount:amount.toString(),
        currency:currency,
        name:"Ankit Shopping",
        description:"Test Transaction ",
        image:{},
        order_id:order_id,
        handler:async function (response)
        {
            const data={
                orderCreationId:order_id,
                razorpayPaymentId:response.razorpay_payment_id,
                razorpayOrderId:response.razorpay_order_id,
                razorpay_signature:response.razorpay_signature,
            };
            alert(data.razorpayPaymentId)
            const result =await axios.post("http://localhost:9191/payment/success",data);
            alert(result.data);
            //Save Payment Details

            const paydetlobjdata = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                cid:props.data.cid,
                billid:nextbillid,
                amount:amount
            };
            axios.post("http://localhost:9191/paymentdetails/paymentdetailsave",paydetlobjdata).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err)
            })
        },
        prefill:{
            name:"Universal Informatics",
            email:"universal@gmail.com",
            contact:"1234567890",
        },notes:{
            address:"Adarsh Nagar",

        },
        theme:{
            colors:"#61dafb",
        }
    };

      const payementObject= new window.Razorpay(options);
      payementObject.open();

   
}
return(
    <div>
    <table>
    <tr> 
    <td> Customer Id</td>
    <td>{props.data.Cid}</td>
    </tr>

    <tr> 
    <td> Customer Name</td>
    <td>{cname}</td>
    </tr>
    <tr>
    <td> Address</td> 
      <td>{caddress}</td>    
    </tr>
    <tr>
    <td> Contact</td> 
      <td>{ccontact}</td>    
    </tr>
    <tr>
    <td> BillDate</td> 
      <td>{mydate}</td>    
    </tr>
    
    </table>
    <center>
    <h4 style={{backgroundColor:"green"}}>Bill</h4>
    <table border="1">
    <tr> 
    <th>ID</th>
    <th>product</th>
    <th>price</th>
    <th>photo</th>
    </tr>
    {
        props.data.selitems.map((item)=>(
            <tr>
            <td> {item.pid}</td>
            <td> {item.pname}</td>
            <td> {item.oprice}</td>
            <img src={"http://localhost:9191/product/getproductimage/"+item.ppicname} height="50" width="50" />
            
            </tr>
        ))
    }
    
    </table>
    
    {
        props.data.selitems.map((item)=>{
            
            total=total+item.oprice;
           
    })
    }

    <h4 style={{backgroundColor:"green"}}> total amount={total}</h4>
    <button type="submit" onClick={displayRazorpay}>Pay Now</button>
    </center>

    
    </div>
)

}export default Bill;