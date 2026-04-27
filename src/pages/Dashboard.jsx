import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card, Nav, Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import { 
  HiOutlineCreditCard, 
  HiOutlinePaperAirplane,
  HiOutlineChevronRight,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { FaPaypal } from "react-icons/fa";

/* High-End Chart Components */
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

function WeeklyActivityChart() {
  const data = [
    { day: "Sat", deposit: 480, withdraw: 240 },
    { day: "Sun", deposit: 350, withdraw: 130 },
    { day: "Mon", deposit: 330, withdraw: 260 },
    { day: "Tue", deposit: 480, withdraw: 370 },
    { day: "Wed", deposit: 150, withdraw: 240 },
    { day: "Thu", deposit: 390, withdraw: 240 },
    { day: "Fri", deposit: 395, withdraw: 340 },
  ];

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <ResponsiveBar
        data={data}
        keys={['withdraw', 'deposit']}
        indexBy="day"
        margin={{ top: 20, right: 0, bottom: 40, left: 30 }}
        padding={0.4}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#16DBCC', '#1814F3']}
        borderRadius={6}
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
        role="application"
        ariaLabel="Weekly activity bar chart"
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

import { ResponsivePie } from '@nivo/pie';

const ExpensePieChart = () => {
  const data = [
    { id: 'Entertainment', label: 'Entertainment', value: 30, color: '#343C6A' },
    { id: 'Bill Expense', label: 'Bill Expense', value: 15, color: '#FFBB38' },
    { id: 'Others', label: 'Others', value: 35, color: '#1814F3' },
    { id: 'Investment', label: 'Investment', value: 20, color: '#FF82AC' },
  ];

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0}
        padAngle={0}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        colors={data.map(d => d.color)}
        colorBy="index"
        borderWidth={0}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.value}%\n${d.id}`}
        arcLabelsSkipAngle={8}
        arcLabelsTextColor="#ffffff"
        arcLabelsRadiusOffset={0.5}
        theme={{
          labels: {
            text: {
              fontSize: 9,
              fontWeight: 700,
              fill: '#ffffff',
              whiteSpace: 'pre-line',
            }
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 12,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }
          }
        }}
      />
    </div>
  );
};


function BalanceHistoryChart() {
  const data = [
    {
      id: "balance",
      color: "hsl(243, 70%, 50%)",
      data: [
        { x: "Jul", y: 180 },
        { x: "Aug", y: 360 },
        { x: "Sep", y: 420 },
        { x: "Oct", y: 760 },
        { x: "Nov", y: 220 },
        { x: "Dec", y: 540 },
        { x: "Jan", y: 610 },
      ]
    }
  ];

  return (
    <div style={{ width: '100%', height: '180px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickValues: 5,
        }}
        enableGridX={true}
        enableGridY={true}
        colors={['#1814F3']}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.15}
        useMesh={true}
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



function Dashboard() {
  const contacts = useMemo(
    () => [
      { name: "Livia Bator", role: "CEO", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
      { name: "Randy Press", role: "Director", img: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
      { name: "Workman", role: "Designer", img: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
    ],
    []
  );
  const [activeContactIndex, setActiveContactIndex] = useState(0);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferMessage, setTransferMessage] = useState("");
  const activeContact = contacts[activeContactIndex];

  const handleTransfer = (event) => {
    event.preventDefault();
    if (!transferAmount.trim()) {
      setTransferMessage("Enter an amount before sending.");
      return;
    }
    setTransferMessage(`Transferred $${transferAmount} to ${activeContact.name}.`);
  };

  return (
    <Container fluid className="dashboard-page px-0 py-0" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Top Row: Cards and Transactions */}
      <Row className="mb-4 gx-4 motion-section motion-delay-1 dashboard-section dashboard-section--top">
        <Col lg={8} className="dashboard-section__cards">
          <div className="d-flex justify-content-between align-items-center mb-3 dashboard-section__header">
            <h2 className="fs-5 fw-bold m-0" style={{ color: '#343C6A' }}>My Cards</h2>
            <Nav.Link as={Link} to="/credit-cards" className="fw-bold small px-0" style={{ color: '#343C6A' }}>See All</Nav.Link>
          </div>
          <Row className="gx-4 dashboard-cards-row">
            <Col md={6} className="dashboard-cards-row__item">
              <div className="bank-card bank-card--primary mb-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="bank-card__label" style={{ fontSize: '0.7rem' }}>Balance</div>
                    <div className="fs-4 fw-bold">$5,756</div>
                  </div>
                  <div className="bank-card__chip bank-card__chip--card"><span></span><span></span></div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="bank-card__label" style={{ fontSize: '0.6rem' }}>CARD HOLDER</div>
                    <div className="fw-semibold small">Eddy Cusuma</div>
                  </div>
                  <div>
                    <div className="bank-card__label" style={{ fontSize: '0.6rem' }}>VALID THRU</div>
                    <div className="fw-semibold small">12/22</div>
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center pt-3 border-top border-white border-opacity-10">
                  <div className="fs-5 fw-semibold" style={{ letterSpacing: '2px' }}>3778 **** **** 1234</div>
                  <div className="bank-card__brand"><span></span><span></span></div>
                </div>
              </div>
            </Col>
            <Col md={6} className="dashboard-cards-row__item">
              <div className="bank-card bank-card--light mb-0 border-0 shadow-sm" style={{ backgroundColor: '#fff' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="bank-card__label text-secondary" style={{ fontSize: '0.7rem' }}>Balance</div>
                    <div className="fs-4 fw-bold" style={{ color: '#343C6A' }}>$5,756</div>
                  </div>
                  <div className="bank-card__chip bank-card__chip--card bank-card__chip--dark"><span></span><span></span></div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="bank-card__label text-secondary" style={{ fontSize: '0.6rem' }}>CARD HOLDER</div>
                    <div className="fw-semibold small" style={{ color: '#343C6A' }}>Eddy Cusuma</div>
                  </div>
                  <div>
                    <div className="bank-card__label text-secondary" style={{ fontSize: '0.6rem' }}>VALID THRU</div>
                    <div className="fw-semibold small" style={{ color: '#343C6A' }}>12/22</div>
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-between align-items-center pt-3 border-top border-light">
                  <div className="fs-5 fw-semibold" style={{ color: '#343C6A', letterSpacing: '2px' }}>3778 **** **** 1234</div>
                  <div className="bank-card__brand"><span></span><span></span></div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={4} className="d-flex flex-column dashboard-section__transactions">
          <h2 className="fs-5 fw-bold mb-3" style={{ color: '#343C6A' }}>Recent Transaction</h2>
          <Card className="dashboard-panel border-0 shadow-sm py-3 px-4 flex-grow-1" style={{ minHeight: '235px' }}>
             <div className="d-flex flex-column justify-content-center h-100">
               {[
                 { title: "Deposit from my Card", date: "28 January 2021", amount: "-$850", color: "#FFBB38", bg: "#FFF5D9", icon: HiOutlineCreditCard },
                 { title: "Deposit Paypal", date: "25 January 2021", amount: "+$2,500", color: "#396AFF", bg: "#E7EDFF", icon: FaPaypal },
                 { title: "Jemi Wilson", date: "21 January 2021", amount: "+$5,400", color: "#16DBCC", bg: "#DCFAF8", icon: HiOutlineCurrencyDollar }
               ].map((tx, i) => (
                 <div key={i} className="d-flex align-items-center mb-3 last-child-mb-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', backgroundColor: tx.bg, color: tx.color }}>
                      <tx.icon size={22} />
                    </div>
                    <div className="flex-grow-1">
                       <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#343C6A' }}>{tx.title}</div>
                       <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{tx.date}</div>
                    </div>
                    <div className={`fw-bold ${tx.amount.startsWith('+') ? 'text-success' : 'text-danger'}`}>{tx.amount}</div>
                 </div>
               ))}
             </div>
          </Card>
        </Col>
      </Row>

      {/* Middle Row: Charts */}
      <Row className="mb-4 gx-4 motion-section motion-delay-2 dashboard-section dashboard-section--middle">
        <Col lg={8} className="d-flex flex-column">
          <h2 className="fs-5 fw-bold mb-3" style={{ color: '#343C6A' }}>Weekly Activity</h2>
          <Card className="dashboard-panel border-0 shadow-sm p-4 dashboard-panel--chart" style={{ height: '350px', overflow: 'hidden' }}>
            <div className="d-flex justify-content-end gap-4 mb-3 small fw-semibold text-secondary dashboard-chart__legend">
               <span className="d-flex align-items-center gap-2"><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1814F3' }}></div> Diposit</span>
               <span className="d-flex align-items-center gap-2"><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#16DBCC' }}></div> Withdraw</span>
            </div>
            <div className="dashboard-chart-frame dashboard-chart-frame--bars">
              <WeeklyActivityChart />
            </div>
          </Card>
        </Col>
        <Col lg={4} className="d-flex flex-column">
          <h2 className="fs-5 fw-bold mb-3" style={{ color: '#343C6A' }}>Expense Statistics</h2>
          <Card className="dashboard-panel border-0 shadow-sm p-4 text-center d-flex flex-column justify-content-center dashboard-panel--chart" style={{ height: '350px', overflow: 'hidden' }}>
            <div className="dashboard-chart-frame dashboard-chart-frame--pie">
              <ExpensePieChart />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom Row: Quick Transfer and Balance History */}
      <Row className="gx-4 motion-section motion-delay-3 dashboard-section dashboard-section--bottom">
        <Col lg={4} className="d-flex flex-column">
          <h2 className="fs-5 fw-bold mb-3" style={{ color: '#343C6A' }}>Quick Transfer</h2>
          <Card className="dashboard-panel border-0 shadow-sm p-4 d-flex flex-column justify-content-between" style={{ height: '230px' }}>
             <div className="d-flex justify-content-between align-items-center mb-4 dashboard-transfer-list">
                {contacts.map((user, i) => (
                  <button
                    key={i}
                    type="button"
                    className="text-center border-0 bg-transparent p-0 dashboard-transfer-person"
                    onClick={() => setActiveContactIndex(i)}
                    aria-pressed={i === activeContactIndex}
                  >
                    <img src={user.img} className="rounded-circle mb-2" style={{ width: '50px', height: '50px', objectFit: 'cover', outline: i === activeContactIndex ? '3px solid #1814F3' : 'none', outlineOffset: '2px' }} alt={user.name} />
                    <div className="fw-bold" style={{ fontSize: '0.8rem', color: i === activeContactIndex ? '#1814F3' : '#343C6A' }}>{user.name}</div>
                    <div className="text-secondary" style={{ fontSize: '0.7rem' }}>{user.role}</div>
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-circle shadow-sm p-2 bg-white d-flex align-items-center justify-content-center border-0"
                  style={{ width: '36px', height: '36px', cursor: 'pointer' }}
                  onClick={() => setActiveContactIndex((currentIndex) => (currentIndex + 1) % contacts.length)}
                  aria-label="Next contact"
                >
                  <HiOutlineChevronRight color="#718EBF" size={18} />
                </button>
             </div>
             <form className="d-flex align-items-center gap-3 dashboard-transfer-form" onSubmit={handleTransfer}>
                <span className="text-secondary small whitespace-nowrap">Write Amount</span>
                <InputGroup className="bg-light rounded-pill overflow-hidden border-0">
                  <Form.Control type="text" placeholder="525.50" value={transferAmount} onChange={(event) => setTransferAmount(event.target.value)} className="bg-transparent border-0 px-3 py-2 small fw-bold" />
                  <Button type="submit" className="border-0 px-4 py-2 small d-flex align-items-center gap-2" style={{ backgroundColor: '#1814F3', borderRadius: '40px' }}>
                    Send <HiOutlinePaperAirplane />
                  </Button>
                </InputGroup>
             </form>
             {transferMessage ? <div className="page-feedback page-feedback--success mt-3 mb-0">{transferMessage}</div> : null}
          </Card>
        </Col>
        <Col lg={8} className="d-flex flex-column">
          <h2 className="fs-5 fw-bold mb-3" style={{ color: '#343C6A' }}>Balance History</h2>
          <Card className="dashboard-panel border-0 shadow-sm p-4 dashboard-panel--chart" style={{ height: '230px' }}>
             <div className="dashboard-chart-frame dashboard-chart-frame--line">
             <BalanceHistoryChart />
             </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
