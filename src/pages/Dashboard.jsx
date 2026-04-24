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
  const chartWidth = 560;
  const chartHeight = 260;
  const left = 48;
  const right = 16;
  const top = 20;
  const bottom = 38;
  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;
  const maxValue = 500;
  const stepX = plotWidth / data.length;
  const barWidth = 12;
  const gap = 5;
  const scaleY = (value) => top + plotHeight - (value / maxValue) * plotHeight;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dashboard-chart dashboard-chart--bars" preserveAspectRatio="none">
      <g stroke="#F2F4F7" strokeWidth="1">
        {[0, 100, 200, 300, 400, 500].map((val) => {
          const y = scaleY(val);
          return (
            <React.Fragment key={val}>
              <line x1={left} y1={y} x2={chartWidth - right} y2={y} strokeDasharray="4 4" />
              <text x={left - 12} y={y} fontSize="12" fill="#718EBF" stroke="none" textAnchor="end" alignmentBaseline="middle">{val}</text>
            </React.Fragment>
          );
        })}
      </g>
      
      {data.map((p, i) => {
        const groupCenter = left + stepX * i + stepX / 2;
        const depositY = scaleY(p.deposit);
        const withdrawY = scaleY(p.withdraw);
        const depositHeight = top + plotHeight - depositY;
        const withdrawHeight = top + plotHeight - withdrawY;
        return (
          <g key={i}>
            <rect x={groupCenter - barWidth - gap / 2} y={depositY} width={barWidth} height={depositHeight} rx="6" fill="#1814F3" />
            <rect x={groupCenter + gap / 2} y={withdrawY} width={barWidth} height={withdrawHeight} rx="6" fill="#16DBCC" />
            <text x={groupCenter} y={chartHeight - 10} fontSize="12" fill="#718EBF" textAnchor="middle">{p.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

const ExpensePieChart = () => {
  const data = [
    { label: 'Entertainment', value: 30, color: '#343C6A' },
    { label: 'Bill Expense', value: 15, color: '#FFBB38' },
    { label: 'Others', value: 35, color: '#1814F3' },
    { label: 'Investment', value: 20, color: '#FF82AC' },
  ];

  let currentAngle = -90;
  const cx = 100;
  const cy = 100;
  const radius = 80;
  const explode = 4;

  return (
    <svg viewBox="0 0 200 200" className="dashboard-chart dashboard-chart--pie" preserveAspectRatio="xMidYMid meet">
      {data.map((item, index) => {
        const sliceAngle = (item.value / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        currentAngle += sliceAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const midRad = ((startAngle + sliceAngle / 2) * Math.PI) / 180;

        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);

        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        const offsetX = Math.cos(midRad) * explode;
        const offsetY = Math.sin(midRad) * explode;

        const pathData = [
          `M ${cx + offsetX} ${cy + offsetY}`,
          `L ${x1 + offsetX} ${y1 + offsetY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2 + offsetX} ${y2 + offsetY}`,
          'Z'
        ].join(' ');

        const textX = cx + offsetX + (radius * 0.6) * Math.cos(midRad);
        const textY = cy + offsetY + (radius * 0.6) * Math.sin(midRad);

        return (
          <g key={index}>
            <path d={pathData} fill={item.color} stroke="white" strokeWidth="2" />
            <text x={textX} y={textY} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
              <tspan x={textX} dy="-4">{item.value}%</tspan>
              <tspan x={textX} dy="12" fontSize="7">{item.label}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
};

function BalanceHistoryChart() {
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
  const values = [180, 360, 420, 760, 220, 540, 610];
  const chartWidth = 640;
  const chartHeight = 180;
  const left = 44;
  const right = 12;
  const top = 14;
  const bottom = 28;
  const maxValue = 800;
  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;
  const stepX = plotWidth / (months.length - 1);
  const scaleY = (value) => top + plotHeight - (value / maxValue) * plotHeight;
  const points = values.map((value, index) => ({
    x: left + stepX * index,
    y: scaleY(value),
  }));
  const linePath = points
    .map((point, index, arr) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const prev = arr[index - 1];
      const cp1x = prev.x + stepX / 3;
      const cp1y = prev.y;
      const cp2x = point.x - stepX / 3;
      const cp2y = point.y;
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    })
    .join(" ");
  const areaPath = `${linePath} L ${left + plotWidth} ${top + plotHeight} L ${left} ${top + plotHeight} Z`;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dashboard-chart dashboard-chart--line" preserveAspectRatio="none">
      <g stroke="#b2b4b6ff" strokeWidth="1">
        {[0, 200, 400, 600, 800].map((value) => {
          const y = scaleY(value);
          return (
            <React.Fragment key={value}>
              <line x1={left} y1={y} x2={chartWidth - right} y2={y} strokeDasharray="4 4" />
              <text x={left - 10} y={y} fontSize="11" fill="#718EBF" textAnchor="end" alignmentBaseline="middle">
                {value}
              </text>
            </React.Fragment>
          );
        })}
        {months.map((month, index) => {
          const x = left + stepX * index;
          return <line key={month} x1={x} y1={top} x2={x} y2={top + plotHeight} strokeDasharray="2 6" />;
        })}
      </g>

      <path
        d={areaPath}
        fill="url(#gradient)"
        opacity="0.18"
      />
      <path d={linePath} fill="none" stroke="#1814F3" strokeWidth="3" strokeLinecap="round" />
      {months.map((month, index) => {
        const x = left + stepX * index;
        return (
          <text key={month} x={x} y={chartHeight - 8} fontSize="11" fill="#718EBF" textAnchor="middle">
            {month}
          </text>
        );
      })}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1814F3" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
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
