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
      <Row className="g-4 mb-4">
        {highlights.map((item) => (
          <Col md={4} key={item.title}>
            <Card className="dashboard-panel border-0 shadow-sm services-highlight-card h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="services-highlight-card__icon" style={{ backgroundColor: item.bg, color: item.color }}>
                  <item.icon size={22} />
                </div>
                <div>
                  <div className="fw-semibold" style={{ color: "#232B5D" }}>{item.title}</div>
                  <div className="text-secondary small">{item.subtitle}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <section>
        <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Bank Services List</h2>
        <div className="d-grid gap-3">
          {services.map((service, index) => (
            <Card key={`${service.title}-${index}`} className={`dashboard-panel border-0 shadow-sm services-list-card${activeServiceIndex === index ? " is-selected" : ""}`}>
              <div className="services-list-row">
                <div className="services-list-row__main">
                  <div className="services-list-row__icon" style={{ backgroundColor: service.bg, color: service.color }}>
                    <service.icon size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold small" style={{ color: "#232B5D" }}>{service.title}</div>
                    <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.description}</div>
                  </div>
                </div>
                <div>
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaA}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaADetail}</div>
                </div>
                <div>
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaB}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaBDetail}</div>
                </div>
                <div>
                  <div className="small" style={{ color: "#232B5D" }}>{service.metaC}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{service.metaCDetail}</div>
                </div>
                <div className="services-list-row__action">
                  <Button
                    variant="outline-primary"
                    className={`services-list-row__button ${service.primary ? "is-primary" : ""}`}
                    onClick={() => setActiveServiceIndex(index)}
                  >
                    {activeServiceIndex === index ? "Viewing" : "View Details"}
                  </Button>
                </div>
              </div>
              {activeServiceIndex === index ? (
                <div className="page-feedback page-feedback--muted mt-3 mb-0">
                  {service.title} selected. Review options and continue from this service.
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

export default ServicesPage;
