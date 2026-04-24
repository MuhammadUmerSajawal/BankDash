import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineBars3, HiOutlineMagnifyingGlass, HiOutlineCog6Tooth, HiOutlineBell } from "react-icons/hi2";
import { appRoutes } from "../../app/routes";

function Header({ title, onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const notificationsRef = useRef(null);
  const notifications = useMemo(
    () => [
      "Your weekly activity report is ready.",
      "A new card setting was selected.",
      "Recent transaction receipt downloaded.",
    ],
    []
  );
  const searchMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return appRoutes.filter(
      (route) =>
        route.title.toLowerCase().includes(query) ||
        route.path.replace("/", "").replace(/-/g, " ").includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    setShowNotifications(false);
    setShowSearchResults(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const clickedInsideDesktopSearch = searchRef.current?.contains(event.target);
      const clickedInsideMobileSearch = mobileSearchRef.current?.contains(event.target);

      if (!clickedInsideDesktopSearch && !clickedInsideMobileSearch) {
        setShowSearchResults(false);
      }

      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchMatches.length) {
      return;
    }
    navigate(searchMatches[0].path);
    setSearchQuery("");
    setShowSearchResults(false);
    setShowNotifications(false);
  };

  return (
    <Navbar className="bg-white border-bottom w-100 page-header" style={{ padding: 0 }}>
      <Container fluid className="px-0 flex-column align-items-stretch page-header__inner">

        {/* ── Top row: hamburger | title | avatar ─────────────────────── */}
        <div className="d-flex align-items-center w-100 page-header__top-row">
          {/* Hamburger (mobile only) */}
          <Button
            variant="link"
            className="p-0 border-0 d-lg-none page-header__menu-button flex-shrink-0"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <HiOutlineBars3 size={24} color="#232b5d" />
          </Button>

          {/* Page title – centered on mobile, left on desktop */}
          <Navbar.Brand className="fw-bold fs-4 m-0 flex-grow-1 page-header__title" style={{ color: '#232b5d' }}>
            {title}
          </Navbar.Brand>

          {/* Desktop: search + icons */}
          <div ref={searchRef} className="position-relative d-none d-md-flex align-items-center me-3">
            <Form onSubmit={handleSearch} className="position-relative page-header__search-desktop">
              <div className="d-flex align-items-center rounded-pill px-3 py-2" style={{ backgroundColor: '#F5F7FA', width: '250px' }}>
                <button type="submit" className="border-0 bg-transparent p-0 me-2 d-inline-flex align-items-center">
                  <HiOutlineMagnifyingGlass className="text-secondary" size={20} />
                </button>
                <Form.Control
                  type="text"
                  placeholder="Search for something"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setShowSearchResults(Boolean(event.target.value.trim()));
                  }}
                  onFocus={() => setShowSearchResults(Boolean(searchQuery.trim()))}
                  className="bg-transparent border-0 p-0 shadow-none"
                  style={{ fontSize: '0.85rem', color: '#8BA3CB' }}
                />
              </div>
            </Form>
            {showSearchResults && searchMatches.length ? (
              <div className="header-popover header-popover--search">
                {searchMatches.map((match) => (
                  <button key={match.path} type="button" className="header-popover__action"
                    onClick={() => { navigate(match.path); setSearchQuery(""); setShowSearchResults(false); }}>
                    <span className="fw-semibold" style={{ color: "#343C6A" }}>{match.title}</span>
                    <span>{match.path}</span>
                  </button>
                ))}
              </div>
            ) : showSearchResults && !searchMatches.length ? (
              <div className="header-popover header-popover--search">No matching page found.</div>
            ) : null}
          </div>

          <div ref={notificationsRef} className="d-none d-md-flex align-items-center gap-3 me-3 position-relative">
            <Button variant="light" className="rounded-circle p-2 border-0 bg-light" onClick={() => navigate("/settings")} aria-label="Open settings">
              <HiOutlineCog6Tooth size={20} color="#718ebf" />
            </Button>
            <Button variant="light" className="rounded-circle p-2 border-0 bg-light position-relative"
              onClick={() => setShowNotifications((current) => !current)} aria-label="Toggle notifications">
              <HiOutlineBell size={20} color="#396AFF" />
              <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </Button>
            {showNotifications ? (
              <div className="header-popover header-popover--notifications">
                <div className="fw-semibold mb-2" style={{ color: "#343C6A" }}>Notifications</div>
                {notifications.map((notification) => (
                  <div key={notification} className="header-popover__item">{notification}</div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Avatar – always visible */}
          <div className="rounded-circle overflow-hidden flex-shrink-0 page-header__avatar" style={{ width: '38px', height: '38px' }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>

        {/* ── Search row (mobile only) ─────────────────────────────────── */}
        <div ref={mobileSearchRef} className="d-md-none position-relative page-header__search-mobile">
          <Form onSubmit={handleSearch}>
            <div className="d-flex align-items-center rounded-pill px-3 py-2" style={{ backgroundColor: '#F5F7FA' }}>
              <button type="submit" className="border-0 bg-transparent p-0 me-2 d-inline-flex align-items-center">
                <HiOutlineMagnifyingGlass className="text-secondary" size={18} />
              </button>
              <Form.Control
                type="text"
                placeholder="Search for something"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowSearchResults(Boolean(event.target.value.trim()));
                }}
                onFocus={() => setShowSearchResults(Boolean(searchQuery.trim()))}
                className="bg-transparent border-0 p-0 shadow-none"
                style={{ fontSize: '0.82rem', color: '#8BA3CB' }}
              />
            </div>
            {showSearchResults ? (
              <div className="header-popover header-popover--search">
                {searchMatches.length ? (
                  searchMatches.map((match) => (
                    <button key={match.path} type="button" className="header-popover__action"
                      onClick={() => { navigate(match.path); setSearchQuery(""); setShowSearchResults(false); }}>
                      <span className="fw-semibold" style={{ color: "#343C6A" }}>{match.title}</span>
                      <span>{match.path}</span>
                    </button>
                  ))
                ) : (
                  <div>No matching page found.</div>
                )}
              </div>
            ) : null}
          </Form>
        </div>

      </Container>
    </Navbar>
  );
}

export default Header;
