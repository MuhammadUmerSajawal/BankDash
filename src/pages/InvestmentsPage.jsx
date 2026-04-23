import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { HiOutlineArrowPath, HiOutlineCurrencyDollar, HiOutlineWallet } from "react-icons/hi2";
import { SiApple, SiSamsung, SiTesla } from "react-icons/si";
import "../styles/investments.css";

const summaryData = [
  { label: "Total Invested Amount", value: "$150,000", icon: HiOutlineWallet, bg: "#DCFAF8", color: "#16C9B8" },
  { label: "Number of Investments", value: "1,250", icon: HiOutlineCurrencyDollar, bg: "#FFE0EB", color: "#FF82AC" },
  { label: "Rate of Return", value: "+5.80%", icon: HiOutlineArrowPath, bg: "#E7EDFF", color: "#396AFF" },
];

const investments = [
  { name: "Apple Store", category: "E-commerce, Marketplace", value: "$54,000", change: "+16%", icon: SiApple, bg: "#FFE0EB", color: "#FF82AC" },
  { name: "Samsung Mobile", category: "E-commerce, Marketplace", value: "$25,300", change: "-4%", icon: SiSamsung, bg: "#E7EDFF", color: "#396AFF" },
  { name: "Tesla Motors", category: "Electric Vehicles", value: "$8,200", change: "+25%", icon: SiTesla, bg: "#FFF5D9", color: "#FFBB38" },
];

const stocks = [
  { rank: "01.", name: "Trivago", price: "$520", returnValue: "+5%" },
  { rank: "02.", name: "Canon", price: "$480", returnValue: "+10%" },
  { rank: "03.", name: "Uber Food", price: "$350", returnValue: "-3%" },
  { rank: "04.", name: "Nokia", price: "$940", returnValue: "+2%" },
  { rank: "05.", name: "Tiktok", price: "$670", returnValue: "-12%" },
];

const yearlySeries = [
  { year: "2016", value: 6000 },
  { year: "2017", value: 23000 },
  { year: "2018", value: 16000 },
  { year: "2019", value: 36000 },
  { year: "2020", value: 20000 },
  { year: "2021", value: 28000 },
];

function buildLinePath(points) {
  return points
    .map((point, index, arr) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const prev = arr[index - 1];
      const dx = (point.x - prev.x) / 3;
      return `C ${prev.x + dx} ${prev.y}, ${point.x - dx} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(" ");
}

function YearlyInvestmentChart() {
  const chartWidth = 520;
  const chartHeight = 250;
  const left = 56;
  const right = 18;
  const top = 18;
  const bottom = 42;
  const maxValue = 40000;
  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;
  const stepX = plotWidth / (yearlySeries.length - 1);
  const scaleY = (value) => top + plotHeight - (value / maxValue) * plotHeight;
  const points = yearlySeries.map((item, index) => ({
    x: left + stepX * index,
    y: scaleY(item.value),
    label: item.year,
    value: item.value,
  }));
  const linePath = buildLinePath(points);

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="investments-chart" preserveAspectRatio="none">
      <g stroke="#E9EEF7" strokeWidth="1">
        {[0, 10000, 20000, 30000, 40000].map((value) => {
          const y = scaleY(value);
          return (
            <React.Fragment key={value}>
              <line x1={left} y1={y} x2={chartWidth - right} y2={y} strokeDasharray="4 4" />
              <text x={left - 14} y={y} textAnchor="end" alignmentBaseline="middle" fontSize="11" fill="#8BA3CB">
                ${value.toLocaleString()}
              </text>
            </React.Fragment>
          );
        })}
      </g>

      <path d={linePath} fill="none" stroke="#FFB648" strokeWidth="3" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke="#F59E0B" strokeWidth="2" />
          <text x={point.x} y={chartHeight - 10} textAnchor="middle" fontSize="11" fill="#8BA3CB">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MonthlyRevenueChart() {
  const values = [12000, 18000, 11000, 26000, 31000, 20000, 27000, 23000, 15000, 33000];
  const labels = ["2016", "2017", "2018", "2019", "2020", "2021"];
  const chartWidth = 520;
  const chartHeight = 250;
  const left = 56;
  const right = 18;
  const top = 18;
  const bottom = 42;
  const maxValue = 40000;
  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;
  const stepX = plotWidth / (values.length - 1);
  const scaleY = (value) => top + plotHeight - (value / maxValue) * plotHeight;
  const points = values.map((value, index) => ({
    x: left + stepX * index,
    y: scaleY(value),
  }));
  const linePath = buildLinePath(points);

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="investments-chart" preserveAspectRatio="none">
      <g stroke="#E9EEF7" strokeWidth="1">
        {[0, 10000, 20000, 30000, 40000].map((value) => {
          const y = scaleY(value);
          return (
            <React.Fragment key={value}>
              <line x1={left} y1={y} x2={chartWidth - right} y2={y} strokeDasharray="4 4" />
              <text x={left - 14} y={y} textAnchor="end" alignmentBaseline="middle" fontSize="11" fill="#8BA3CB">
                ${value.toLocaleString()}
              </text>
            </React.Fragment>
          );
        })}
      </g>

      <path d={linePath} fill="none" stroke="#16DBCC" strokeWidth="3" strokeLinecap="round" />
      {labels.map((label, index) => {
        const x = left + (plotWidth / (labels.length - 1)) * index;
        return (
          <text key={label} x={x} y={chartHeight - 10} textAnchor="middle" fontSize="11" fill="#8BA3CB">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

function InvestmentsPage() {
  return (
    <Container fluid className="investments-page">
      <Row className="g-4 mb-4">
        {summaryData.map((item) => (
          <Col md={4} key={item.label}>
            <Card className="dashboard-panel border-0 shadow-sm investments-summary-card h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="investments-summary-card__icon" style={{ backgroundColor: item.bg, color: item.color }}>
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="text-secondary small">{item.label}</div>
                  <div className="fw-bold fs-4" style={{ color: "#232B5D" }}>{item.value}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Yearly Total Investment</h2>
          <Card className="dashboard-panel border-0 shadow-sm investments-chart-card">
            <div className="investments-chart-frame">
              <YearlyInvestmentChart />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Monthly Revenue</h2>
          <Card className="dashboard-panel border-0 shadow-sm investments-chart-card">
            <div className="investments-chart-frame">
              <MonthlyRevenueChart />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>My Investment</h2>
          <div className="d-grid gap-3">
            {investments.map((investment) => (
              <Card key={investment.name} className="dashboard-panel border-0 shadow-sm investments-item-card">
                <div className="investments-item-row">
                  <div className="investments-item-row__main">
                    <div className="investments-item-row__icon" style={{ backgroundColor: investment.bg, color: investment.color }}>
                      <investment.icon size={22} />
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ color: "#232B5D" }}>{investment.name}</div>
                      <div className="text-secondary small">{investment.category}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-semibold" style={{ color: "#232B5D" }}>{investment.value}</div>
                    <div className="text-secondary small">Investment Value</div>
                  </div>
                  <div className="text-end">
                    <div className={`fw-semibold ${investment.change.startsWith("+") ? "text-success" : "text-danger"}`}>
                      {investment.change}
                    </div>
                    <div className="text-secondary small">Return Value</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <h2 className="fs-5 fw-bold mb-3" style={{ color: "#343C6A" }}>Trending Stock</h2>
          <Card className="dashboard-panel border-0 shadow-sm p-0 overflow-hidden investments-stocks-card">
            <Table hover className="m-0 investments-stocks-table">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-0">SL No</th>
                  <th className="py-3 border-0">Name</th>
                  <th className="py-3 border-0">Price</th>
                  <th className="py-3 border-0 text-end px-4">Return</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.rank}>
                    <td className="px-4 border-0 text-secondary">{stock.rank}</td>
                    <td className="border-0" style={{ color: "#232B5D" }}>{stock.name}</td>
                    <td className="border-0">{stock.price}</td>
                    <td className={`border-0 text-end px-4 ${stock.returnValue.startsWith("+") ? "text-success" : "text-danger"}`}>
                      {stock.returnValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InvestmentsPage;
