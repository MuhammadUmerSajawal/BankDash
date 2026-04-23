import React from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { HiOutlineBars3, HiOutlineMagnifyingGlass, HiOutlineCog6Tooth, HiOutlineBell } from "react-icons/hi2";

function Header({ title, onMenuClick }) {
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
          <div className="d-none d-md-flex align-items-center rounded-pill px-3 py-2 me-4" style={{ backgroundColor: '#F5F7FA', width: '250px' }}>
            <HiOutlineMagnifyingGlass className="text-secondary me-2" size={20} />
            <Form.Control
              type="text"
              placeholder="Search for something"
              className="bg-transparent border-0 p-0 shadow-none"
              style={{ fontSize: '0.85rem', color: '#8BA3CB' }}
            />
          </div>

          <div className="d-none d-md-flex gap-3 me-4">
            <Button variant="light" className="rounded-circle p-2 border-0 bg-light">
              <HiOutlineCog6Tooth size={20} color="#718ebf" />
            </Button>
            <Button variant="light" className="rounded-circle p-2 border-0 bg-light position-relative">
              <HiOutlineBell size={20} color="#396AFF" />
              <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </Button>
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
