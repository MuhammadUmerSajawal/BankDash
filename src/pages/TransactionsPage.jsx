import React, { useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/transactions.css";
import {
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

const cards = [
  { id: 1, balance: "$5,756", holder: "Eddy Cusuma", expiry: "12/22", number: "3778 **** **** 1234", variant: "primary" },
  { id: 2, balance: "$5,756", holder: "Eddy Cusuma", expiry: "12/22", number: "3778 **** **** 1234", variant: "light" },
];

const expenseSeries = [
  { month: "Aug", amount: 7600 },
  { month: "Sep", amount: 11100 },
  { month: "Oct", amount: 8100 },
  { month: "Nov", amount: 4300 },
  { month: "Dec", amount: 12500 },
  { month: "Jan", amount: 7200 },
];

const transactions = [
  {
    id: "#12548796",
    description: "Spotify Subscription",
    type: "Shopping",
    card: "1234 ****",
    date: "28 Jan, 12.30 AM",
    amount: -2500,
    category: "expense",
  },
  {
    id: "#12548796",
    description: "Freepik Sales",
    type: "Transfer",
    card: "1234 ****",
    date: "25 Jan, 10.40 PM",
    amount: 750,
    category: "income",
  },
  {
    id: "#12548796",
    description: "Mobile Service",
    type: "Service",
    card: "1234 ****",
    date: "20 Jan, 10.40 PM",
    amount: -150,
    category: "expense",
  },
  {
    id: "#12548796",
    description: "Wilson",
    type: "Transfer",
    card: "1234 ****",
    date: "15 Jan, 03.29 PM",
    amount: -1050,
    category: "expense",
  },
  {
    id: "#12548796",
    description: "Emilly",
    type: "Transfer",
    card: "1234 ****",
    date: "14 Jan, 10.40 PM",
    amount: 840,
    category: "income",
  },
];

function formatAmount(amount) {
  const sign = amount > 0 ? "+" : "-";
  return `${sign}$${Math.abs(amount).toLocaleString()}`;
}

import { ResponsiveBar } from '@nivo/bar';

function ExpenseChart() {
  const data = expenseSeries.map(item => ({
    ...item,
    color: item.month === "Dec" ? "#16DBCC" : "#F2F4F7"
  }));

  return (
    <div style={{ width: '100%', height: '180px' }}>
      <ResponsiveBar
        data={data}
        keys={['amount']}
        indexBy="month"
        margin={{ top: 20, bottom: 25, left: 10, right: 10 }}
        padding={0.5}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => data.color}
        borderRadius={8}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisLeft={null}
        enableGridY={false}
        enableLabel={false}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#718EBF',
                fontSize: 11,
              }
            }
          }
        }}
      />
    </div>
  );
}


function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const downloadReceipt = (transaction) => {
    const receipt = [
      "Transaction Receipt",
      `Description: ${transaction.description}`,
      `Transaction ID: ${transaction.id}`,
      `Type: ${transaction.type}`,
      `Card: ${transaction.card}`,
      `Date: ${transaction.date}`,
      `Amount: ${formatAmount(transaction.amount)}`,
    ].join("\n");
    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${transaction.description.toLowerCase().replace(/\s+/g, "-")}-receipt.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredTransactions =
    activeFilter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.category === activeFilter);

  const incomeTotal = filteredTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenseTotal = filteredTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return (
    <Container fluid className="transactions-page">
      <Row className="transactions-page__top g-4 mb-4 motion-section motion-delay-1">
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-5 fw-bold m-0" style={{ color: "#343C6A" }}>My Cards</h2>
            <Nav.Link as={Link} to="/credit-cards" className="fw-bold small px-0" style={{ color: "#343C6A" }}>+ Add Card</Nav.Link>
          </div>
          <Row className="g-4 transactions-cards-row">
            {cards.map((card) => (
              <Col key={card.id} md={6} className="transactions-cards-row__item">
                <div className={`bank-card bank-card--${card.variant} mb-0`}>
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
        </Col>

        <Col lg={4}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>My Expense</h2>
          <Card className="dashboard-panel border-0 shadow-sm transactions-expense-card">
            <ExpenseChart />
            <div className="transactions-expense-meta">
              <span>Income: ${incomeTotal.toLocaleString()}</span>
              <span>Expense: ${expenseTotal.toLocaleString()}</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="motion-section motion-delay-2">
        <Col xs={12}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Recent Transactions</h2>

          <Nav
            variant="underline"
            activeKey={activeFilter}
            onSelect={(selectedKey) => setActiveFilter(selectedKey || "all")}
            className="transactions-filters mb-3"
          >
            <Nav.Item>
              <Nav.Link eventKey="all" className="transactions-filters__tab">All Transactions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="income" className="transactions-filters__tab">Income</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="expense" className="transactions-filters__tab">Expense</Nav.Link>
            </Nav.Item>
          </Nav>

          <Card className="dashboard-panel border-0 shadow-sm p-0 overflow-hidden transactions-table-card">
            <div className="transactions-table__header d-none d-md-grid">
              <span>Description</span>
              <span>Transaction ID</span>
              <span>Type</span>
              <span>Card</span>
              <span>Date</span>
              <span className="text-end">Amount</span>
              <span className="text-end">Receipt</span>
            </div>

            <div className="transactions-table__body">
              {filteredTransactions.map((transaction) => {
                const positive = transaction.amount > 0;
                return (
                  <div key={`${transaction.id}-${transaction.description}-${transaction.date}`} className="transactions-table__row">
                    <div className="transactions-table__description">
                      <div className="transactions-table__bullet">
                        {positive ? (
                          <HiOutlineArrowDownCircle size={20} color="#16DBCC" />
                        ) : (
                          <HiOutlineArrowUpCircle size={20} color="#396AFF" />
                        )}
                      </div>
                      <div>
                        <span>{transaction.description}</span>
                        <span className="transactions-table__date-mobile">{transaction.date}</span>
                      </div>
                    </div>
                    <span className="text-secondary">{transaction.id}</span>
                    <span className="text-secondary">{transaction.type}</span>
                    <span className="text-secondary">{transaction.card}</span>
                    <span className="text-secondary transactions-table__date-desktop">{transaction.date}</span>
                    <span className={`transactions-table__amount ${positive ? "text-success" : "text-danger"}`}>
                      {formatAmount(transaction.amount)}
                    </span>
                    <span className="transactions-table__receipt">
                      <Button variant="outline-primary" className="transactions-receipt-btn" onClick={() => downloadReceipt(transaction)}>
                        <HiOutlineArrowDownTray size={16} />
                        Download
                      </Button>
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TransactionsPage;
