import React, { useEffect, useState } from "react";
import "../../css/components/topbar.css";
import { GiBloodySword } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { FaRegUser, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartDropdown from "./CartDropdown";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function TopBar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [index, setIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const messages = t("messages", { returnObjects: true });
  const shadowStyles = [
    "0 0 5px #ff0000",
    "0 0 8px #00ff00",
    "0 0 10px #ffaa00",
    "0 0 6px #00ccff",
    "0 0 5px #ff00ff",
  ];


  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const toggleLang = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <div className="topbar">
      <div className="topbar-left" onClick={() => navigate("/")}>
        <GiBloodySword className="logo-icon" />
        <span className="brand-name">{t("brand")}</span>
      </div>

      <div className="topbar-center">
        <span
          className="promo-text"
          style={{ textShadow: shadowStyles[index % shadowStyles.length] }}
        >
          {messages[index]}
        </span>
      </div>

      <div className="topbar-right">
        <button onClick={toggleLang} className="icon-btn" title={t("buttons.change_lang")}>
          <MdLanguage />
        </button>

        <CartDropdown />

        <div className="profile-wrapper" style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="icon-btn"
            title={t("buttons.profile")}
          >
            <FaRegUser />
          </button>

          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>

        <button onClick={toggleTheme} className="icon-btn" title={t("buttons.toggle_theme")}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}
