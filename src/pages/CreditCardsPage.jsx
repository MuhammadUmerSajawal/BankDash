import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { HiOutlineChevronDown, HiOutlineCreditCard, HiOutlineLockClosed } from "react-icons/hi2";
import { FaApple, FaApplePay, FaGooglePay } from "react-icons/fa";
import "../styles/credit-cards.css";

const initialCreditCards = [
  { balance: "$5,756", holder: "Eddy Cusuma", expiry: "12/22", number: "3778 **** **** 1234", variant: "primary" },
  { balance: "$5,756", holder: "Eddy Cusuma", expiry: "12/22", number: "3778 **** **** 1234", variant: "primary" },
  { balance: "$5,756", holder: "Eddy Cusuma", expiry: "12/22", number: "3778 **** **** 1234", variant: "light" },
];

const cardStatistics = [
  { label: "DBL Bank", color: "#4C6EF5" },
  { label: "BRC Bank", color: "#FF82AC" },
  { label: "ABM Bank", color: "#16DBCC" },
  { label: "MCP Bank", color: "#FFBB38" },
];

const cardList = [
  { type: "Secondary", bank: "DBL Bank", number: "**** **** 5600", name: "William", bg: "#E7EDFF", color: "#396AFF" },
  { type: "Secondary", bank: "BRC Bank", number: "**** **** 4300", name: "Michel", bg: "#FFE0EB", color: "#FF82AC" },
  { type: "Secondary", bank: "ABM Bank", number: "**** **** 7560", name: "Edward", bg: "#FFF5D9", color: "#FFBB38" },
];

const settings = [
  { title: "Block Card", desc: "Instantly block your card", icon: HiOutlineCreditCard, bg: "#FFF5D9", color: "#FFBB38" },
  { title: "Change Pin Code", desc: "Choose another pin code", icon: HiOutlineLockClosed, bg: "#E7EDFF", color: "#396AFF" },
  { title: "Add to Google Pay", desc: "Withdraw without any card", icon: FaGooglePay, bg: "#FFE0EB", color: "#FF82AC" },
  { title: "Add to Apple Pay", desc: "Withdraw without any card", icon: FaApplePay, bg: "#DCFAF8", color: "#16C9B8" },
  { title: "Add to Apple Store", desc: "Withdraw without any card", icon: FaApple, bg: "#DCFAF8", color: "#16C9B8" },
];

function DonutChart() {
  return (
    <svg viewBox="0 0 220 220" className="credit-cards-donut" preserveAspectRatio="xMidYMid meet">
      <circle cx="110" cy="110" r="54" fill="none" stroke="#F2F4F7" strokeWidth="30" />
      <path d="M 110 56 A 54 54 0 0 1 164 110" fill="none" stroke="#16DBCC" strokeWidth="30" strokeLinecap="round" />
      <path d="M 164 110 A 54 54 0 0 1 110 164" fill="none" stroke="#FF82AC" strokeWidth="30" strokeLinecap="round" />
      <path d="M 110 164 A 54 54 0 0 1 56 110" fill="none" stroke="#FFBB38" strokeWidth="30" strokeLinecap="round" />
      <path d="M 56 110 A 54 54 0 0 1 110 56" fill="none" stroke="#4C6EF5" strokeWidth="30" strokeLinecap="round" />
      <circle cx="110" cy="110" r="24" fill="#fff" />
    </svg>
  );
}

function CreditCardsPage() {
  const [creditCards, setCreditCards] = useState(initialCreditCards);
  const [selectedCardNumber, setSelectedCardNumber] = useState(cardList[0].number);
  const [selectedSetting, setSelectedSetting] = useState(settings[0].title);
  const [formValues, setFormValues] = useState({
    type: "Classic",
    name: "",
    number: "",
    expiry: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedNumber = formValues.number.trim() || "**** **** **** ****";
    const suffix = trimmedNumber.replace(/\s+/g, "").slice(-4).padStart(4, "*");
    const maskedNumber = `**** **** **** ${suffix}`;
    const newCard = {
      balance: "$5,756",
      holder: formValues.name || "My Cards",
      expiry: formValues.expiry.slice(0, 5).includes("/") ? formValues.expiry : "12/22",
      number: maskedNumber,
      variant: creditCards.length % 2 === 0 ? "primary" : "light",
    };
    setCreditCards((currentCards) => [newCard, ...currentCards].slice(0, 4));
    setFeedback(`Added ${formValues.type} card for ${formValues.name || "My Cards"}.`);
    setFormValues({
      type: "Classic",
      name: "",
      number: "",
      expiry: "",
    });
  };

  return (
    <Container fluid className="credit-cards-page">
      <section className="mb-4">
        <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>My Cards</h2>
        <Row className="g-4">
          {creditCards.map((card, index) => (
            <Col xl={4} md={6} key={`${card.number}-${index}`}>
              <div className={`bank-card bank-card--${card.variant} credit-cards-page__card mb-0`}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className={`bank-card__label ${card.variant === "light" ? "text-secondary" : ""}`} style={{ fontSize: "0.7rem" }}>
                      Balance
                    </div>
                    <div className="fs-4 fw-bold" style={card.variant === "light" ? { color: "#343C6A" } : undefined}>
                      {card.balance}
                    </div>
                  </div>
                  <div className={`bank-card__chip ${card.variant === "light" ? "bank-card__chip--dark" : ""}`}>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className={`bank-card__label ${card.variant === "light" ? "text-secondary" : ""}`} style={{ fontSize: "0.6rem" }}>
                      CARD HOLDER
                    </div>
                    <div className="fw-semibold small" style={card.variant === "light" ? { color: "#343C6A" } : undefined}>
                      {card.holder}
                    </div>
                  </div>
                  <div>
                    <div className={`bank-card__label ${card.variant === "light" ? "text-secondary" : ""}`} style={{ fontSize: "0.6rem" }}>
                      VALID THRU
                    </div>
                    <div className="fw-semibold small" style={card.variant === "light" ? { color: "#343C6A" } : undefined}>
                      {card.expiry}
                    </div>
                  </div>
                </div>
                <div className={`mt-4 d-flex justify-content-between align-items-center pt-3 ${card.variant === "light" ? "border-top border-light" : "border-top border-white border-opacity-10"}`}>
                  <div className="fs-5 fw-semibold" style={{ letterSpacing: "2px", ...(card.variant === "light" ? { color: "#343C6A" } : {}) }}>
                    {card.number}
                  </div>
                  <div className="bank-card__brand"><span></span><span></span></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Row className="g-4 mb-4">
        <Col lg={4}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Card Expense Statistics</h2>
          <Card className="dashboard-panel border-0 shadow-sm credit-cards-stats-card">
            <div className="credit-cards-stats-card__chart">
              <DonutChart />
            </div>
            <div className="credit-cards-stats-card__legend">
              {cardStatistics.map((stat) => (
                <div key={stat.label} className="credit-cards-stats-card__legend-item">
                  <span style={{ backgroundColor: stat.color }}></span>
                  {stat.label}
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col lg={8}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Card List</h2>
          <div className="d-grid gap-3">
            {cardList.map((card) => (
              <Card key={card.number} className={`dashboard-panel border-0 shadow-sm credit-cards-list-card${selectedCardNumber === card.number ? " is-selected" : ""}`}>
                <div className="credit-cards-list-row">
                  <div className="credit-cards-list-row__icon" style={{ backgroundColor: card.bg, color: card.color }}>
                    <HiOutlineCreditCard size={22} />
                  </div>
                  <div>
                    <div className="text-secondary small">Card Type</div>
                    <div className="fw-semibold" style={{ color: "#343C6A" }}>{card.type}</div>
                  </div>
                  <div>
                    <div className="text-secondary small">Bank</div>
                    <div className="fw-semibold" style={{ color: "#343C6A" }}>{card.bank}</div>
                  </div>
                  <div>
                    <div className="text-secondary small">Card Number</div>
                    <div className="fw-semibold" style={{ color: "#343C6A" }}>{card.number}</div>
                  </div>
                  <div className="d-none d-md-block">
                    <div className="text-secondary small">Namain Card</div>
                    <div className="fw-semibold" style={{ color: "#343C6A" }}>{card.name}</div>
                  </div>
                  <button type="button" className="credit-cards-list-row__link border-0 bg-transparent" onClick={() => setSelectedCardNumber(card.number)}>View Details</button>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Add New Card</h2>
          <Card className="dashboard-panel border-0 shadow-sm credit-cards-form-card">
            <p className="text-secondary small mb-4 credit-cards-form-card__copy">
              Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
            </p>
            <Form onSubmit={handleSubmit}>
              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Card Type</Form.Label>
                    <Form.Select value={formValues.type} onChange={(event) => setFormValues((current) => ({ ...current, type: event.target.value }))} className="credit-cards-form-card__field">
                      <option>Classic</option>
                      <option>Gold</option>
                      <option>Platinum</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Name On Card</Form.Label>
                    <Form.Control type="text" placeholder="My Cards" value={formValues.name} onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))} className="credit-cards-form-card__field" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Card Number</Form.Label>
                    <Form.Control type="text" placeholder="**** **** **** ****" value={formValues.number} onChange={(event) => setFormValues((current) => ({ ...current, number: event.target.value }))} className="credit-cards-form-card__field" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Expiration Date</Form.Label>
                    <div className="credit-cards-form-card__date-wrap">
                      <Form.Control type="text" placeholder="25 January 2025" value={formValues.expiry} onChange={(event) => setFormValues((current) => ({ ...current, expiry: event.target.value }))} className="credit-cards-form-card__field pe-5" />
                      <HiOutlineChevronDown className="credit-cards-form-card__date-icon" />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="credit-cards-form-card__submit">
                Add Card
              </Button>
            </Form>
            {feedback ? <div className="page-feedback page-feedback--success">{feedback}</div> : null}
          </Card>
        </Col>

        <Col lg={4}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Card Setting</h2>
          <Card className="dashboard-panel border-0 shadow-sm credit-cards-settings-card">
            <div className="credit-cards-settings-list">
              {settings.map((item) => (
                <button type="button" key={item.title} className={`credit-cards-settings-row border-0 bg-transparent text-start${selectedSetting === item.title ? " is-active" : ""}`} onClick={() => setSelectedSetting(item.title)}>
                  <div className="credit-cards-settings-row__icon" style={{ backgroundColor: item.bg, color: item.color }}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold small" style={{ color: "#343C6A" }}>{item.title}</div>
                    <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreditCardsPage;
