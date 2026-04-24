import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  HiOutlineBriefcase,
  HiOutlineBuildingLibrary,
  HiOutlineChartBarSquare,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineHeart,
} from "react-icons/hi2";
import "../styles/services.css";

const highlights = [
  {
    title: "Life Insurance",
    subtitle: "Unlimited protection",
    icon: HiOutlineHeart,
    bg: "#E7EDFF",
    color: "#396AFF",
  },
  {
    title: "Shopping",
    subtitle: "Buy. Think. Grow.",
    icon: HiOutlineShoppingBag,
    bg: "#FFF5D9",
    color: "#FFBB38",
  },
  {
    title: "Safety",
    subtitle: "We are your allies",
    icon: HiOutlineShieldCheck,
    bg: "#DCFAF8",
    color: "#16DBCC",
  },
];

const services = [
  {
    title: "Business loans",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineBriefcase,
    bg: "#FFE0EB",
    color: "#FF82AC",
    primary: false,
  },
  {
    title: "Checking accounts",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineBuildingLibrary,
    bg: "#FFF5D9",
    color: "#FFBB38",
    primary: false,
  },
  {
    title: "Savings accounts",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineChartBarSquare,
    bg: "#FFE0EB",
    color: "#FF82AC",
    primary: true,
  },
  {
    title: "Debit and credit cards",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineCreditCard,
    bg: "#E7EDFF",
    color: "#396AFF",
    primary: false,
  },
  {
    title: "Life Insurance",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineShieldCheck,
    bg: "#DCFAF8",
    color: "#16DBCC",
    primary: false,
  },
  {
    title: "Business loans",
    description: "It is a long established",
    metaA: "Lorem Ipsum",
    metaADetail: "Many publishing",
    metaB: "Lorem Ipsum",
    metaBDetail: "Many publishing",
    metaC: "Lorem Ipsum",
    metaCDetail: "Many publishing",
    icon: HiOutlineBriefcase,
    bg: "#FFE0EB",
    color: "#FF82AC",
    primary: false,
  },
];

function ServicesPage() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(2);

  return (
    <Container fluid className="services-page">
      <Row className="g-4 mb-4 motion-section motion-delay-1 services-highlights-row">
        {highlights.map((item) => (
          <Col md={4} key={item.title} className="services-highlights-row__item">
            <Card className="dashboard-panel border-0 shadow-sm services-highlight-card h-100">
              <div className="d-flex align-items-center gap-3 h-100">
                <div className="services-highlight-card__icon" style={{ backgroundColor: item.bg, color: item.color }}>
                  <item.icon size={22} />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <div className="fw-semibold" style={{ color: "#232B5D" }}>{item.title}</div>
                  <div className="text-secondary small" style={{ fontSize: "0.75rem" }}>{item.subtitle}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <section className="motion-section motion-delay-2">
        <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Bank Services List</h2>
        <div className="d-grid gap-3">
          {services.map((service, index) => (
            <Card key={`${service.title}-${index}`} className={`dashboard-panel border-0 shadow-sm services-list-card${activeServiceIndex === index ? " is-selected" : ""}`}>
              <div className="services-list-row">
                <div className="services-list-row__main">
                  <div className="services-list-row__icon" style={{ backgroundColor: service.bg, color: service.color }}>
                    <service.icon size={20} />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <div className="fw-semibold" style={{ color: "#232B5D" }}>{service.title}</div>
                    <div className="text-secondary" style={{ fontSize: "0.75rem", lineHeight: "1.2" }}>{service.description}</div>
                  </div>
                </div>
                <div className="services-list-col-meta">
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaA}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaADetail}</div>
                </div>
                <div className="services-list-col-meta">
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaB}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaBDetail}</div>
                </div>
                <div className="services-list-col-meta">
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaC}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaCDetail}</div>
                </div>
                <div className="services-list-row__action">
                  <button
                    type="button"
                    className="services-view-details-btn border-0 bg-transparent px-0"
                    onClick={() => setActiveServiceIndex(index)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

export default ServicesPage;
