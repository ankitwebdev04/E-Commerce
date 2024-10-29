import React from "react";
import CustomerReg from "./CustomerReg";
import CustomerLogin from "./CustomerLogin";
import { Link,Outlet,Route,Routes } from "react-router-dom";
import mainpic from "./cust.jpg"
import '../Customermain.css';

function CustomerMain()
{
    return(
        <div>
            <center>
            <img src={mainpic} height={350} width={1000}/>
            <h1 style={{backgroundColor:"black",color:"white",marginTop:10}}>Customer Main</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/customermain/customerlogin" style={{fontSize:30}}>Login</Link>
                        </li>
                        <li>
                            <Link to="/customermain/customerreg"style={{fontSize:30}}>Registration</Link>
                        </li>
                    </ul>
                   <Outlet/>
                </nav>
            </center>
        </div>
    );
} export default CustomerMain;
