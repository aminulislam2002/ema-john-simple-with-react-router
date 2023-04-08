import React, { useEffect, useState } from "react";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveCart = [];
    // Step 01: get id of the addedProduct
    for (const id in storedCart) {
      // console.log(id)
      // Step 02: get the product from products by using id
      const addedProduct = products.find((product) => product.id === id);
      // console.log(addedProduct);
      if (addedProduct) {
        // Step 03: get the quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // Step 04: add the added Product to the saved cart
        saveCart.push(addedProduct);
      }
      // console.log("added product", addedProduct);
    }
    // Step 05: save cart
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log(product);
    let newCart = [];
    // const newCart = [...cart, product];

    // if product doesn't exist in the cart, then set quantity =1
    // or if exist update quantity by 1

    const exist = cart.find((pd) => pd.id === product.id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exist];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product product={product} handleAddToCart={handleAddToCart} key={product.id}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart handleClearCart={handleClearCart} cart={cart}>
          <Link className="proceed-link" to="/orders">
            <button className="btn-proceed">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
