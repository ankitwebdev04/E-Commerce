import React from "react";
import { BrowserRouter as Router,
     Link,
     Route,
     Routes} from "react-router-dom";
import CustomerMain from "./customerviews/CustomerMain";
import VenderMain from "./venderviews/VenderMain";
import AdminMain from "./adminviews/AdminMain";
import AdminLogin from "./adminviews/AdminLogin";
import AdminReg from "./adminviews/AdminReg";
import CustomerLogin from "./customerviews/CustomerLogin";
import CustomerReg from "./customerviews/CustomerReg";
import VenderLogin from "./venderviews/VenderLogin";
import VenderReg from "./venderviews/VenderReg";
import "./index.css";

function MainPage()
{
    return(
        <div className="App">
            
                {/* <img src={mainpic} height={350} width={1400}/> */}
                    <nav>
                        <Link to="adminmain">Admin</Link><span> </span>
                        <Link to="customermain">Customer</Link><span> </span>
                        <Link to="vendermain">Vender</Link>
                    </nav>
                    <Routes>
                        <Route path="/adminmain" element={<AdminMain />} >
                        <Route 
                                path="adminlogin" element={<AdminLogin/>} />
                        <Route 
                                path="adminreg" element={<AdminReg />} />
                      </Route>
                      <Route
                                path="/customermain" element={<CustomerMain />}>

                            <Route 
                                path="customerlogin" element={<CustomerLogin />} />

                                <Route 
                                    path="customerreg" element={<CustomerReg />} />
                           </Route>

                           <Route
                                path="/vendermain" element={<VenderMain />} >

                            <Route 
                                path="venderlogin" element={<VenderLogin />}/>
                            <Route
                                path="venderreg"element={<VenderReg />}/>
                                </Route>
                    </Routes>
        </div>


    );
}export default MainPage;