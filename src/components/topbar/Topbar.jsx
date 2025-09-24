import React, { useEffect, useState } from "react";
import "../../css/components/topbar.css";
import { GiBloodySword } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { FaRegUser, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import CartDropdown from "./CartDropdown";

import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function TopBar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [index, setIndex] = useState(0);
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const messages = {
    fa: [
      "📦 ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان",
      "🔥 تخفیف ویژه تا ۷۰٪ فقط امروز!",
      "🎁 هدیه‌ی ویژه برای اولین خرید شما",
      "🚚 تحویل اکسپرس در سراسر کشور",
      "💳 پرداخت در محل برای سفارش‌های خاص",
    ],
    en: [
      "📦 Free shipping for orders over 500,000 Toman",
      "🔥 Special discount up to 70% today only!",
      "🎁 Special gift for your first purchase",
      "🚚 Express delivery across the country",
      "💳 Cash on delivery for specific orders",
    ],
  };

  const shadowStyles = [
    "0 0 5px #ff0000",
    "0 0 8px #00ff00",
    "0 0 10px #ffaa00",
    "0 0 6px #00ccff",
    "0 0 5px #ff00ff",
  ];

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages[lang].length);
    }, 4000);
    return () => clearInterval(interval);
  }, [lang]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang(lang === "fa" ? "en" : "fa");

  return (
    <div className="topbar">
      <div className="topbar-left" onClick={() => navigate("/")}>
        <GiBloodySword className="logo-icon" />
        <span className="brand-name">FS</span>
      </div>

      <div className="topbar-center">
        <span
          className="promo-text"
          style={{ textShadow: shadowStyles[index % shadowStyles.length] }}
        >
          {messages[lang][index]}
        </span>
      </div>

      <div className="topbar-right">
        <button onClick={toggleLang} className="icon-btn" title="تغییر زبان">
          <MdLanguage />
        </button>

        <CartDropdown />

        <div className="profile-wrapper" style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="icon-btn"
            title="پروفایل"
          >
            <FaRegUser />
          </button>

          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>

        <button onClick={toggleTheme} className="icon-btn" title="تغییر تم">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}
