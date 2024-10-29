import React from "react";
import StateMgt from "./Statemgt";
import CityMgt from "./Citymgt";
import ProductCatgMgt from "./ProductCatgMgt";
import VenderMgt from "./VenderMgt";
import Product from "../productviews/Product";

import { Link,Route,Routes } from "react-router-dom";
import "../index.css";

function AdminHome()
{
    return(
        <div>
            <center>
                <h4>Admin Home Page</h4>
                <nav>
                    <ul>
                        <li>
                            <Link to="/statemgt">State</Link>
                        </li>
                        <li>
                            <Link to="/citymgt">City</Link>
                        </li>
                        <li>
                            <Link to="/ProuctCatgMgt">Product Category</Link>
                        </li>
                        <li>
                            <Link to="/vendermgt">Vender Management</Link>
                        </li>
                        <li>
                            <Link to="/productmgt">Product Management</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/"element={<AdminHome/>}/>
                    <Route path="/Statemgt"element={<StateMgt/>}/>
                    <Route path="/Citymgt"element={<CityMgt/>}/>
                    <Route path="/ProuctCatgMgt"element={<ProductCatgMgt/>}/>
                    <Route path="/vendermgt"element={<VenderMgt/>}/>
                    <Route path="/productmgt"element={<Product/>}/>
                </Routes>
            </center>
        </div>
    );
}export default AdminHome;