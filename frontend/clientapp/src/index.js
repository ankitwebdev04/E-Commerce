import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Statemgt from './adminviews/Statemgt';
import Citymgt from './adminviews/Citymgt';
import ProductCatgMgt from './adminviews/ProductCatgMgt';
import ProductList from './productviews/ProductList';
import Product from './productviews/Product';
import CustomerReg from './customerviews/CustomerReg';
import CustomerLogin from './customerviews/CustomerLogin';
import Bill from './customerviews/Bill';
import VenderReg from './venderviews/VenderReg';
import VenderLogin from './venderviews/VenderLogin';
import { BrowserRouter } from 'react-router-dom';
import VenderMain from './venderviews/VenderMain';
import VenderMgt from './adminviews/VenderMgt';
import AdminHome from './adminviews/AdminHome';
import MainPage from './MainPage';
import CustomerMain from './customerviews/CustomerMain';
import AdminMain from './adminviews/AdminMain';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  <BrowserRouter>
  //   {/* <MainPage/> */}
  //  {/* <CustomerMain/> */}
  //  {/* <VenderMain/> */}
  //  {/* <AdminMain/>  */}
  // {/* <AdminHome/> */}
  // </BrowserRouter> 
  
   <React.StrictMode>
     <Statemgt/>
   <Citymgt/>
     <ProductCatgMgt/>
     <Product/>
    <ProductList/>
     <CustomerReg/>
      <CustomerLogin/>
     <VenderReg/>
     <VenderLogin/>
     {/* <Bill/> */}
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
