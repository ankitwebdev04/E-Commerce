import React ,{useEffect,useState} from "react";
import ProductList from "../productviews/ProductList";
import ReactDOM from "react-dom/client";
import BillByID from "./BillByID";
import CustomerLogin from "./CustomerLogin";

function CustomerHome(props)
{
    const[custname,setCustName]=useState();
    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('sessionauth'));
        if(obj!=undefined&&obj!=null)
        {
            //alert(obj.username);
            setCustName(obj.userfullname);
        }else{
            alert('session expired');
        }
    })
    const handleShopingButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<ProductList data={cid}></ProductList>);
    }
    const handleShowBills=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<BillByID data={cid}></BillByID>);
       
    }
    const handleLogOut=()=>{
        sessionStorage.removeItem('sessionmouth');
        alert("Customer Session Closed");
        const root=ReactDOM.createRoot(document.getElementById("root"));

        root.render(<CustomerLogin/>);
    }
    return(
        <div>
            <p>Current Session Running For {custname}</p>
            customer Id{props.data.cid}
            <h4 style={{backgroundColor:"yellow"}}>Customer Home Page</h4>
            <h5>Welcome{props.data.cfname}</h5>
            <img src={"http://localhost:9191/customer/getimage/"+props.data.cpicname}
            height={100} width={100}/>
            <button type="submit" onClick={handleShopingButton}>Shoping</button>

            <button type="submit" onClick={handleShowBills}>Show Bills</button>
            <button type={handleLogOut}>LogOut</button>
        </div>
    );
}export default CustomerHome;