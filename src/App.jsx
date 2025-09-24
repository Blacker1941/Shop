import './App.css';
import { Routes, Route } from "react-router-dom";
import TopBar from './components/topbar/Topbar.jsx';
import HomeMenu from './components/HomeMenu/HomeMenu.jsx';
import routes from "./routes";
import { LanguageProvider } from "./LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <TopBar />
      <Routes>
        {routes.map((r) => {
          // مسیرهای ورود و ثبت‌نام بدون HomeMenu
          if (r.path === "/login" || r.path === "/register") {
            return (
              <Route
                key={r.path}
                path={r.path}
                element={
                  <div className="container" style={{ padding: "2rem", flex: 1 }}>
                    {r.element}
                  </div>
                }
              />
            );
          }

          // مسیرهای اصلی با HomeMenu
          return (
            <Route
              key={r.path}
              path={r.path}
              element={
                <div className="container" style={{ display: "flex" }}>
                  <HomeMenu />
                  <div style={{ flex: 1 }}>{r.element}</div>
                </div>
              }
            />
          );
        })}
      </Routes>
    </LanguageProvider>
  );
}

export default App;
