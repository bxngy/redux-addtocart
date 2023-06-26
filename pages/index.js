import React, { Component } from "react";
import ProductList from "../component/ProductList.js";
import AddProduct from "../component/addProduct.js";
import Cart from "../component/cart.js";
export default function index() {
  return (
    <div>
        <div className="d-flex justify-content-end">
   <Cart />

        <AddProduct />

        </div>
        <ProductList />

      

      
    </div>
  );
}
