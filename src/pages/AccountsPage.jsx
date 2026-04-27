import React from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
  HiOutlineBanknotes,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineWallet,
} from "react-icons/hi2";
import "../styles/accounts.css";

const summaryCards = [
  { title: "My Balance", amount: "$12,750", icon: HiOutlineWallet, color: "#FFB648", bg: "#FFF5D9" },
  { title: "Income", amount: "$5,600", icon: HiOutlineCurrencyDollar, color: "#396AFF", bg: "#E7EDFF" },
  { title: "Expense", amount: "$3,460", icon: HiOutlineDocumentText, color: "#FF82AC", bg: "#FFE0EB" },
  { title: "Total Saving", amount: "$7,920", icon: HiOutlineBanknotes, color: "#16DBCC", bg: "#DCFAF8" },
];

const transactions = [
  {
    title: "Spotify Subscription",
    date: "25 Jan 2021",
    category: "Shopping",
    card: "1234 ****",
    status: "Pending",
    amount: -150,
    positive: false,
    icon: HiOutlineArrowDownCircle,
    iconColor: "#16DBCC",
    iconBg: "#DCFAF8",
  },
  {
    title: "Mobile Service",
    date: "25 Jan 2021",
    category: "Service",
    card: "1234 ****",
    status: "Completed",
    amount: -340,
    positive: false,
    icon: HiOutlineCreditCard,
    iconColor: "#396AFF",
    iconBg: "#E7EDFF",
  },
  {
    title: "Emilly Wilson",
    date: "25 Jan 2021",
    category: "Transfer",
    card: "1234 ****",
    status: "Completed",
    amount: 780,
    positive: true,
    icon: HiOutlineArrowUpCircle,
    iconColor: "#FF82AC",
    iconBg: "#FFE0EB",
  },
];

const invoices = [
  { name: "Apple Store", time: "5h ago", amount: "$450", color: "#16DBCC", bg: "#DCFAF8" },
  { name: "Michael", time: "2 days ago", amount: "$160", color: "#FFB648", bg: "#FFF5D9" },
  { name: "Playstation", time: "5 days ago", amount: "$1085", color: "#396AFF", bg: "#E7EDFF" },
  { name: "William", time: "10 days ago", amount: "$90", color: "#FF82AC", bg: "#FFE0EB" },
];

const debitCreditSeries = [
  { day: "Sat", debit: 320, credit: 620 },
  { day: "Sun", debit: 250, credit: 500 },
  { day: "Mon", debit: 240, credit: 330 },
  { day: "Tue", debit: 560, credit: 290 },
  { day: "Wed", debit: 360, credit: 570 },
  { day: "Thu", debit: 390, credit: 250 },
  { day: "Fri", debit: 470, credit: 580 },
];

function formatAmount(amount) {
  const sign = amount > 0 ? "+" : "-";
  return `${sign}$${Math.abs(amount).toLocaleString()}`;
}

import { ResponsiveBar } from '@nivo/bar';

function DebitCreditChart() {
  return (
    <div style={{ width: '100%', height: '240px' }}>
      <ResponsiveBar
        data={debitCreditSeries}
        keys={['debit', 'credit']}
        indexBy="day"
        margin={{ top: 20, right: 0, bottom: 40, left: 30 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#1814F3', '#FF82AC']}
        borderRadius={8}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableLabel={false}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#718EBF',
                fontSize: 11,
              }
            }
          },
          grid: {
            line: {
              stroke: '#F2F4F7',
              strokeWidth: 1,
              strokeDasharray: '4 4'
            }
          }
        }}
      />
    </div>
  );
}


function AccountsPage() {
  return (
    <Container fluid className="accounts-page">
      <Row className="g-4 mb-4 motion-section motion-delay-1">
        {summaryCards.map((card) => (
          <Col lg={3} sm={6} xs={6} key={card.title}>
            <Card className="dashboard-panel border-0 shadow-sm accounts-summary-card h-100">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="accounts-summary-card__icon"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  <card.icon size={24} />
                </div>
                <div>
                  <div className="text-secondary small">{card.title}</div>
                  <div className="fw-bold fs-4" style={{ color: "#232B5D" }}>{card.amount}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4 motion-section motion-delay-2">
        <Col lg={8}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Last Transaction</h2>
          <Card className="dashboard-panel border-0 shadow-sm accounts-transactions-card">
            <div className="accounts-transactions-list">
              {transactions.map((tx) => (
                <div key={tx.title} className="accounts-transaction-row">
                  <div className="accounts-transaction-row__main">
                    <div
                      className="accounts-transaction-row__icon"
                      style={{ backgroundColor: tx.iconBg, color: tx.iconColor }}
                    >
                      <tx.icon size={20} />
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ color: "#232B5D" }}>{tx.title}</div>
                      <div className="text-secondary small">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-secondary small d-none d-md-block">{tx.category}</div>
                  <div className="text-secondary small d-none d-md-block">{tx.card}</div>
                  <div className="text-secondary small d-none d-md-block">{tx.status}</div>
                  <div className={`fw-bold small ${tx.positive ? "text-success" : "text-danger"}`}>
                    {formatAmount(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0" style={{ color: "#343C6A" }}>My Card</h2>
            <Nav.Link as={Link} to="/credit-cards" className="fw-bold small px-0" style={{ color: "#343C6A" }}>See All</Nav.Link>
          </div>
          <div className="bank-card bank-card--primary accounts-my-card mb-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <div className="bank-card__label" style={{ fontSize: "0.7rem" }}>Balance</div>
                <div className="fs-4 fw-bold">$5,756</div>
              </div>
              <div className="bank-card__chip"><span></span><span></span></div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <div className="bank-card__label" style={{ fontSize: "0.6rem" }}>CARD HOLDER</div>
                <div className="fw-semibold small">Eddy Cusuma</div>
              </div>
              <div>
                <div className="bank-card__label" style={{ fontSize: "0.6rem" }}>VALID THRU</div>
                <div className="fw-semibold small">12/22</div>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-between align-items-center pt-3 border-top border-white border-opacity-10">
              <div className="fs-5 fw-semibold" style={{ letterSpacing: "2px" }}>3778 **** **** 1234</div>
              <div className="bank-card__brand"><span></span><span></span></div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 motion-section motion-delay-3">
        <Col lg={8}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Debit & Credit Overview</h2>
          <Card className="dashboard-panel border-0 shadow-sm accounts-chart-card">
            <div className="accounts-chart-card__top">
              <div className="small text-secondary">
                <span style={{ color: "#232B5D" }}>$7,560</span> Debited &amp; <span style={{ color: "#232B5D" }}>$5,420</span> Credited in this Week
              </div>
              <div className="accounts-chart-card__legend">
                <span><i className="accounts-legend-dot accounts-legend-dot--debit"></i>Debit</span>
                <span><i className="accounts-legend-dot accounts-legend-dot--credit"></i>Credit</span>
              </div>
            </div>
            <div className="accounts-chart-frame">
              <DebitCreditChart />
            </div>
          </Card>
        </Col>

        <Col lg={4}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Invoices Sent</h2>
          <Card className="dashboard-panel border-0 shadow-sm accounts-invoices-card">
            <div className="accounts-invoices-list">
              {invoices.map((invoice) => (
                <div key={invoice.name} className="accounts-invoice-row">
                  <div
                    className="accounts-invoice-row__icon"
                    style={{ backgroundColor: invoice.bg, color: invoice.color }}
                  >
                    <HiOutlineWallet size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold small" style={{ color: "#343C6A" }}>{invoice.name}</div>
                    <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{invoice.time}</div>
                  </div>
                  <div className="fw-semibold text-secondary small">{invoice.amount}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountsPage;
