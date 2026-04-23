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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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
    <Navbar className="bg-white border-bottom py-3 w-100">
      <Container fluid className="px-4">
        <div className="d-flex align-items-center">
          <Button variant="link" className="p-0 border-0 me-3 d-lg-none" onClick={onMenuClick}>
            <HiOutlineBars3 size={24} color="#232b5d" />
          </Button>
          <Navbar.Brand className="fw-bold fs-4 m-0" style={{ color: '#232b5d' }}>{title}</Navbar.Brand>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <Form ref={searchRef} onSubmit={handleSearch} className="d-none d-md-block me-4 position-relative">
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
            {showSearchResults ? (
              <div className="header-popover header-popover--search">
                {searchMatches.length ? (
                  searchMatches.map((match) => (
                    <button
                      key={match.path}
                      type="button"
                      className="header-popover__action"
                      onClick={() => {
                        navigate(match.path);
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                    >
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

          <div ref={notificationsRef} className="d-none d-md-flex gap-3 me-4 position-relative">
            <Button variant="light" className="rounded-circle p-2 border-0 bg-light" onClick={() => navigate("/settings")} aria-label="Open settings">
              <HiOutlineCog6Tooth size={20} color="#718ebf" />
            </Button>
            <Button
              variant="light"
              className="rounded-circle p-2 border-0 bg-light position-relative"
              onClick={() => setShowNotifications((current) => !current)}
              aria-label="Toggle notifications"
            >
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

          <div className="rounded-circle overflow-hidden" style={{ width: '45px', height: '45px' }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
