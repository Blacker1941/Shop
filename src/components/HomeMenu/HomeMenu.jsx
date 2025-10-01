import React, { useState } from "react";
import swordData from "../../data/swords.json";
import { GiBloodySword } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/components/homeMenu.css";
import { useLanguage } from "../../LanguageContext"; 

const translations = {
  fa: {
    placeholder: "به دنبال چه شمشیری هستی؟",
    logo: "FS"
  },
  en: {
    placeholder: "Which sword are you looking for?",
    logo: "FS"
  }
};

const FantasyShopHome = () => {
  const [search, setSearch] = useState("");
  const { lang } = useLanguage();
  
  const navigate = useNavigate();

  const suggestions = swordData.filter(
    (sword) =>
      search &&
      sword.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (sword) => {
    setSearch(sword.name);
    navigate(`/products/${sword.id}`);
  };

  return (
    <div className="home-wrapper fancy-bg">
      <h1 className="title" onClick={() => navigate("/")}>
        <GiBloodySword /> {translations[lang].logo}
      </h1>

      <div className="search-box enhanced">
        <input
          type="text"
          placeholder={translations[lang].placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            textAlign: lang === "fa" ? "right" : "left"
          }}
        />

        <button>
          <FaSearch />
        </button>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s)}
                className="suggestion-item"
              >
                <img
                  src={`/img/${s.img}`}
                  alt={s.name}
                  className="suggestion-img"
                />
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FantasyShopHome;
