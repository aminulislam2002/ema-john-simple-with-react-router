import React from "react";
import "./Orders.css";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";

const Orders = () => {
  const cart = useLoaderData();
  console.log(cart);
  return (
    <div className="shop-container">
      <div className="products-container">
        <h1>Orders Page {cart.length}</h1>
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
