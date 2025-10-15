import React, { useState, useEffect, useRef } from "react";
import swords from "../../data/swords.json";
import "../../css/components/ItemList.css";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ItemList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const categories = t("itemList.categories", { returnObjects: true });


  const categoryMap = {
    [t("types.All")]: "All",
    [t("types.Sword")]: "Sword",
    [t("types.Armor")]: "Armor",
    [t("types.Mace")]: "Mace",
    [t("types.Spear")]: "Spear",
    [t("types.Axe")]: "Axe",
  };


  const filtered = swords.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.type.en === selectedCategory;
  });

  useEffect(() => {
    const calcItemsPerPage = () => {
      if (!gridRef.current) return;
      const style = getComputedStyle(gridRef.current);
      const columnCount = style.gridTemplateColumns.split(" ").length;
      setItemsPerPage(columnCount * 2);
    };
    calcItemsPerPage();
    window.addEventListener("resize", calcItemsPerPage);
    return () => window.removeEventListener("resize", calcItemsPerPage);
  }, []);

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = filtered.slice(start, end);

  const handleNext = () => { if (end < filtered.length) setPage(prev => prev + 1); };
  const handlePrev = () => { if (page > 0) setPage(prev => prev - 1); };
  const handleCategory = (cat) => { 
    setSelectedCategory(categoryMap[cat] || "All"); 
    setPage(0); 
  };

  return (
    <div className={`item-list-wrapper ${lang}`}>
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={selectedCategory === (categoryMap[cat] || "All") ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="item-grid" ref={gridRef}>
        {Array.from({ length: itemsPerPage }).map((_, i) => {
          const item = currentItems[i];
          if (!item) return <div className="empty-slot" key={i} />;
          return (
            <div
              className="item-card"
              key={i}
              onClick={() => navigate(`/products/${item.id}`)}
            >
              {item.img && <img src={`/img/${item.img}`} alt={item.name[lang]} className="item-img" />}
              <h3 className={lang === "en" ? "en-font" : ""}>{item.name[lang]}</h3>
              <p><FaMoneyCheckAlt /> {item.price.toLocaleString()} {t("cart.currency")}</p>
              <p className="type-label">{t(`types.${item.type.en}`)}</p>
            </div>
          );
        })}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page === 0}>
          {t("itemList.prev")}
        </button>
        <span>
          {t("itemList.pageText", { 
            current: page + 1, 
            total: Math.ceil(filtered.length / itemsPerPage || 1) 
          })}
        </span>
        <button onClick={handleNext} disabled={end >= filtered.length}>
          {t("itemList.next")}
        </button>
      </div>
    </div>
  );
};

export default ItemList;
