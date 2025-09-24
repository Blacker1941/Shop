import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swordData from "../../data/swords.json";
import "../../css/components/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = swordData.find((s) => s.id === id);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [quantity, setQuantity] = useState(0); // تعداد محصول در سبد

  // بارگذاری نظرات
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
    setReviews(saved);
  }, [id]);

  // بارگذاری تعداد محصول از localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product?.id);
    if (existing) {
      setQuantity(existing.quantity);
    }
  }, [product?.id]);

  const saveReviews = (updated) => {
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
  };

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    const updated = [...reviews, { text: newReview, date: new Date().toLocaleString() }];
    saveReviews(updated);
    setNewReview("");
  };

  const updateCart = (newQuantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (newQuantity <= 0) {
      cart = cart.filter((item) => item.id !== product.id);
      setQuantity(0);
    } else {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity = newQuantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: newQuantity
        });
      }
      setQuantity(newQuantity);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    updateCart(quantity + 1);
    setToastMessage("محصول به سبد خرید اضافه شد!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemoveFromCart = () => {
    updateCart(quantity - 1);
    setToastMessage("تعداد محصول کاهش یافت!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!product) return <div>محصولی یافت نشد.</div>;

  return (
    <div className="product-detail">
      {showToast && <div className="toast">{toastMessage}</div>}

      <img src={`/img/${product.img}`} alt={product.name} className="product-img" />
      <h2>{product.name}</h2>
      <p>قیمت: {product.price.toLocaleString()} دینار ساسانی</p>
      <p>نوع: {product.type}</p>
      <p>این محصول دارای ویژگی‌های خاصی است...</p>

      {quantity === 0 ? (
        <button className="buy-btn" onClick={handleAddToCart}>
          خرید
        </button>
      ) : (
        <div className="quantity-controls">
          <button className="qty-btn1" onClick={handleRemoveFromCart}>-</button>
          <span className="qty-display">{quantity}</span>
          <button className="qty-btn2" onClick={handleAddToCart}>+</button>
        </div>
      )}

      <div className="reviews-section">
        <h3>نظرات کاربران</h3>
        <div className="review-form">
          <textarea
            placeholder="نظر خود را بنویسید..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview}>ارسال نظر</button>
        </div>

        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.slice(0).reverse().map((rev, i) => (
              <li key={i}>
                <p>{rev.text}</p>
                <small>{rev.date}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>هنوز نظری ثبت نشده.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
