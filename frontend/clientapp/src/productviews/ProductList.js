import React,{useEffect,useState} from "react";
import axios from "axios";
import cart from "./cart.jpg";
import ReactDOM from "react-dom/client";
import Bill from "../customerviews/Bill";

function ProductList(props)
{
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    var cname="";
   // var cid;
    
    useEffect(()=>{
        axios.get("http://localhost:9191/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:9191/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleBuyButton=(evt)=>{
        setItemCount(itemcount+1);
        plist.map((item)=>{
            if(item.pid==evt)
            {
                selitems.push(item);                                        
            }
        });
    }
    const handleCheckOutButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));

        var ccid=props.data;
        alert("customer id="+ccid);
     //   selitems.push(cid)

        var obj={
            selitems:selitems,
            Cid:ccid
        };
        

        root.render(<Bill data={obj}></Bill>)
       
    }
    const handleSearch=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:9191/product/showproductbycatgid/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }else
        {
            axios.get("http://localhost:9191/product/showproduct").then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err)
            });
        }
    }
    return(
        <div>
            <h6 style={{height:30}}>CUSTOMER ID {props.data}</h6>
            <div>
                <img src={cart} height="50" width="70"/>
                <label>{itemcount}</label>
                <button type="submit" className="btn btn-success" onClick={handleCheckOutButton}>CheckOut</button>
            </div>
            <center>
                Search By Category<select onClick={handleSearch}>
                    <option value="0">All</option>
                    {
                        pcatglist.map((pcatgitem)=>(
                            <option value={pcatgitem.pcatgid}>
                                {pcatgitem.pcatgname}</option>
                        ))
                    }
                </select>
                <p style={{backgroundColor:"black",color:"white",height:30}}>ProductList</p>
                <table border={1} style={{backgroundColor:"paleturquoise"}}>
                    <tr>
                        <th style={{width:70}}>Id</th>
                        <th style={{width:90}}>PR Name</th>
                        <th style={{width:90}}>Price</th>
                        <th style={{width:90}}>OfferPrice</th>
                        <th style={{width:90}}>Categ Id</th>
                        <th style={{width:90}}>Categ Name</th>
                        <th style={{width:90}}>Photo</th>
                        <th style={{width:70}}>Action</th>
                    </tr>
                    {
                        plist.map((item)=>(
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>{item.pcatgid}</td>
                                <td>
                                    {
                                        pcatglist.map((citem)=>{
                                            
                                            if(item.pcatgid==citem.pcatgid)
                                            {
                                                cname=(citem.pcatgname)

                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:9191/product/getproductimage/"+item.ppicname}
                                    height="100" width="100"/>
                                </td>
                                <td>
                                    <button clastype="submit" className="btn btn-primary" onClick={()=>handleBuyButton
                                        (item.pid)}>Buy</button>
                                    
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ProductList;