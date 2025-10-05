import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import "../../css/components/cartDropdown.css";

export default function CartDropdown() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;


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
      <button className="icon-btn" title={t("cart.title")} onClick={toggleCart}>
        <FaShoppingCart />
      </button>

      {cartOpen && (
        <div className="cart-dropdown">
          {cartItems.length > 0 ? (
            <>
              <ul className="ulshop">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={`/img/${item.img}`} alt={item.name[lang]} />
                    <div>
                      <p>{item.name[lang]}</p>
                      <small>
                        {item.price.toLocaleString()} × {item.quantity}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                {t("cart.total")}: {totalPrice.toLocaleString()} {t("cart.currency")}
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                {t("cart.checkout")}
              </button>
            </>
          ) : (
            <div className="empty-cart">{t("cart.empty")}</div>
          )}
        </div>
      )}
    </div>
  );
}

