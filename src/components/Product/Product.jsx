import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  //   console.log(props.product)
  const { img, name, price, quantity, ratings, ratingsCount, seller, shipping, stock } = props.product;

  const handleAddToCart = props.handleAddToCart;

  return ( 
    <div className="product">
      <p>Product Component</p>
      <img src={img} alt="" />
      <div className="product-info">
        <h5 className="product-name">{name}</h5>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller} </p>
        <p>Rating: {ratings} Stars</p>
      </div>
      <button onClick={() => handleAddToCart(props.product)} className="btn-cart">
        Add To Cart
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;
