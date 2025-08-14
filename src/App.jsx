import './App.css';
import { Routes, Route } from "react-router-dom";
import TopBar from './components/topbar/Topbar.jsx';
import HomeMenu from './components/HomeMenu/HomeMenu.jsx';
import ItemList from './components/ItemList/ItemList.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import { LanguageProvider } from "./LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <TopBar />
      <div className="container" style={{ display: "flex" }}>
        <HomeMenu />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
