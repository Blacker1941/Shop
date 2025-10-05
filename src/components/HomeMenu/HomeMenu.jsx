import React, { useState } from "react";
import swordData from "../../data/swords.json";
import { GiBloodySword } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/components/homeMenu.css";
import { useTranslation } from "react-i18next";

const FantasyShopHome = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const suggestions = swordData.filter(
    (sword) =>
      search &&
      sword.name[lang].toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (sword) => {
    setSearch(sword.name[lang]);
    navigate(`/products/${sword.id}`);
  };

  return (
    <div className="home-wrapper fancy-bg">
      <h1 className="title" onClick={() => navigate("/")}>
        <GiBloodySword /> FS
      </h1>

      <div className="search-box enhanced">
        <input
          type="text"
          placeholder={t("home.placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ textAlign: lang === "fa" ? "right" : "left" }}
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
                  alt={s.name[lang]}
                  className="suggestion-img"
                />
                <span>{s.name[lang]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FantasyShopHome;
