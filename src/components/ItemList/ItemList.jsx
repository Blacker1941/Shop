import React, { useState, useEffect, useRef } from "react";
import swords from "../../data/swords.json";
import "../../css/components/ItemList.css";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../LanguageContext"; // گرفتن زبان از Context

// فقط داده فارسی
const translations = {
  categories: ["همه", "شمشیر", "زره", "گرز", "نیزه", "تبر"],
  prev: "قبلی",
  next: "بعدی",
  pageText: (current, total) => `صفحه ${current} از ${total}`,
};

// Map برای انگلیسی
const typeMap = {
  "همه": "All",
  "شمشیر": "Sword",
  "زره": "Armor",
  "گرز": "Mace",
  "نیزه": "Spear",
  "تبر": "Axe",
};

const ItemList = () => {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const { lang } = useLanguage(); // گرفتن زبان از Context
  const gridRef = useRef(null);
  const navigate = useNavigate();

  // فیلتر کردن آیتم‌ها همیشه با فارسی
  const filtered = swords.filter((item) => {
    if (selectedCategory === "همه") return true;
    return item.type === selectedCategory;
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
  const handleCategory = (cat) => { setSelectedCategory(cat); setPage(0); };

  return (
    <div className={`item-list-wrapper ${lang}`}>
      <div className="category-bar">
        {translations.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {lang === "en" ? typeMap[cat] : cat}
          </button>
        ))}
      </div>

      <div className="item-grid" ref={gridRef}>
        {Array.from({ length: itemsPerPage }).map((_, i) => {
          const item = currentItems[i];
          return (
            <div
              className="item-card"
              key={i}
              onClick={() => item && navigate(`/products/${item.id}`)}
            >
              {item ? (
                <>
                  {item.img && <img src={`/img/${item.img}`} alt={item.name} className="item-img" />}
                  <h3 className={lang === "en" ? "en-font" : ""}>{item.name}</h3>
                  <p><FaMoneyCheckAlt /> {item.price.toLocaleString()} دینار ساسانی</p>
                  <p className="type-label">
                    {lang === "en" ? typeMap[item.type] : item.type}
                  </p>
                </>
              ) : (
                <div className="empty-slot" />
              )}
            </div>
          );
        })}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page === 0}>
          {lang === "en" ? "Prev" : translations.prev}
        </button>
        <span>
          {lang === "en"
            ? `Page ${page + 1} of ${Math.ceil(filtered.length / itemsPerPage || 1)}`
            : translations.pageText(page + 1, Math.ceil(filtered.length / itemsPerPage || 1))}
        </span>
        <button onClick={handleNext} disabled={end >= filtered.length}>
          {lang === "en" ? "Next" : translations.next}
        </button>
      </div>
    </div>
  );
};

export default ItemList;
