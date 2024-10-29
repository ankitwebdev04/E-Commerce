import React from "react";
import { Link,Outlet,Route,Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import mainpic from "./administration.jpg"
import "../index.css";

function AdminMain()
{
    return(
        <div>
    
            <center>
            <img src={mainpic} height={350} width={1000}/>
                <nav>
                    <ul>
                        <li>
                            <Link to="/adminmain/adminlogin">Login</Link>
                        </li>
                        {/* <li>
                            <Link to="/adminmain/adminreg">Registration</Link>
                        </li> */}
                    </ul>
                    <Outlet/>
                </nav>
               </center>
        </div>
    );
} export default AdminMain;