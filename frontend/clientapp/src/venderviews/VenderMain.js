import React from "react";
import VenderReg from "./VenderReg";
import VenderLogin from "./VenderLogin";
import mainpic from "./vendor-management.jpg"
import { Link,Outlet,Route,Routes } from "react-router-dom";
import "../index.css";


function VenderMain()
{
    return(
        <div>
            <center>
            <img src={mainpic} height={350} width={1000}/>
                <nav>
                    <ul>
                        <li>
                            <Link to="/vendermain/venderlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/vendermain/venderreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    );
}export default VenderMain;