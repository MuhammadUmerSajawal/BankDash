import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Sidebar";
import { appRoutes, defaultRoute } from "./app/routes.jsx";

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPage =
    appRoutes.find((route) => route.path === location.pathname) ?? defaultRoute;

  return (
    <div className={`app ${isMobileSidebarOpen ? "app--sidebar-open" : ""}`}>
      <Navbar onNavigate={() => setIsMobileSidebarOpen(false)} />
      
      <main className="content">
        {/* Overlay moved inside main or kept as absolute outside the grid flow */}
        <div 
          className="app__overlay" 
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>

        <Header
          title={currentPage.title}
          onMenuClick={() => setIsMobileSidebarOpen((open) => !open)}
        />

        <div className="content__body">
          <Routes>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
