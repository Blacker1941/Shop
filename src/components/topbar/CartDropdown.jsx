import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/components/cartDropdown.css";

export default function CartDropdown() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    setCartOpen((prev) => !prev);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <button className="icon-btn" title="شاپ" onClick={toggleCart}>
        <FaShoppingCart />
      </button>

      {cartOpen && (
        <div className="cart-dropdown">
          {cartItems.length > 0 ? (
            <>
              <ul className="ulshop">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={`/img/${item.img}`} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <small>
                        {item.price.toLocaleString()} × {item.quantity}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                جمع کل: {totalPrice.toLocaleString()} دینار ساسانی
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                برو به حساب
              </button>
            </>
          ) : (
            <div className="empty-cart">سبد خرید خالی است.</div>
          )}
        </div>
      )}
    </div>
  );
}
