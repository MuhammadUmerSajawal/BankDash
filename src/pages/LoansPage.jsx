import React from "react";
import { Container, Card, Table, Row, Col } from "react-bootstrap";
import { HiOutlineUser, HiOutlineGlobeAlt, HiOutlineArrowPath, HiOutlineBriefcase } from "react-icons/hi2";
import "../styles/loans.css";

const loanSummary = [
  { label: "Personal Loans", value: "$50,000", icon: HiOutlineUser, color: "#FF82AC", bg: "#FFE0EB" },
  { label: "Corporate Loans", value: "$100,000", icon: HiOutlineBriefcase, color: "#396AFF", bg: "#E7EDFF" },
  { label: "Business Loans", value: "$500,000", icon: HiOutlineGlobeAlt, color: "#FFBB38", bg: "#FFF5D9" },
  { label: "Custom Loans", value: "$250,000", icon: HiOutlineArrowPath, color: "#16C9B8", bg: "#DCFAF8" },
];

function LoansPage() {
  return (
    <Container fluid className="content__body">
      <Row className="mb-4 motion-section motion-delay-1 loans-summary-row">
        {loanSummary.map((item, i) => (
          <Col lg={3} sm={6} key={i} className="mb-3 loans-summary-row__item">
             <Card className="dashboard-panel border-0 loans-summary-card h-100">
               <div className="d-flex align-items-center gap-3 h-100">
                  <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px', backgroundColor: item.bg, color: item.color }}>
                    <item.icon size={24} />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <div className="text-secondary small mb-1" style={{ fontSize: "0.75rem" }}>{item.label}</div>
                    <div className="fw-bold fs-4" style={{ color: "#232B5D", lineHeight: "1.2" }}>{item.value}</div>
                  </div>
               </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="motion-section motion-delay-2">
      <h2 className="fs-4 fw-bold mb-3" style={{ color: '#232b5d' }}>Active Loans Overview</h2>
      <Card className="dashboard-panel border-0 p-0 overflow-hidden loans-table-card">
        <Table responsive hover className="m-0 loans-table">
          <thead>
            <tr>
              <th className="px-4 py-3 border-0 loans-col-id">SL No</th>
              <th className="py-3 border-0 loans-col-money">Loan Money</th>
              <th className="py-3 border-0 loans-col-left">Left to Pay</th>
              <th className="py-3 border-0 loans-col-duration">Duration</th>
              <th className="py-3 border-0 loans-col-rate">Interest Rate</th>
              <th className="py-3 border-0 loans-col-installment">Installment</th>
              <th className="py-3 border-0 text-end px-4 loans-col-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "01.", money: "$100,000", left: "$40,500", duration: "8 Months", rate: "12%", installment: "$2,000 / month", status: "Repay" },
              { id: "02.", money: "$500,000", left: "$250,000", duration: "36 Months", rate: "10%", installment: "$8,000 / month", status: "Repay" },
              { id: "03.", money: "$900,000", left: "$40,500", duration: "12 Months", rate: "14%", installment: "$5,000 / month", status: "Repay" },
              { id: "04.", money: "$50,000", left: "$40,500", duration: "6 Months", rate: "10%", installment: "$1,000 / month", status: "Repay" },
              { id: "05.", money: "$50,000", left: "$40,500", duration: "6 Months", rate: "10%", installment: "$1,000 / month", status: "Repay" },
              { id: "06.", money: "$80,000", left: "$25,500", duration: "10 Months", rate: "12%", installment: "$1,500 / month", status: "Repay" },
              { id: "07.", money: "$12,000", left: "$5,500", duration: "4 Months", rate: "12%", installment: "$500 / month", status: "Repay" },
              { id: "08.", money: "$160,000", left: "$100,800", duration: "12 Months", rate: "10%", installment: "$2,500 / month", status: "Repay" },
            ].map((loan, i) => (
              <tr key={i}>
                <td className="px-4 py-3 border-0 loans-col-id">{loan.id}</td>
                <td className="py-3 border-0 fw-semibold loans-col-money" style={{ color: '#232b5d' }}>{loan.money}</td>
                <td className="py-3 border-0 loans-col-left" style={{ color: '#232b5d' }}>{loan.left}</td>
                <td className="py-3 border-0 loans-col-duration">{loan.duration}</td>
                <td className="py-3 border-0 loans-col-rate">{loan.rate}</td>
                <td className="py-3 border-0 loans-col-installment">{loan.installment}</td>
                <td className="py-3 border-0 text-end px-4 loans-col-status">
                  <button className="btn btn-outline-primary btn-sm rounded-pill px-3 loans-repay-btn">{loan.status}</button>
                </td>
              </tr>
            ))}
            <tr className="loans-total-row">
              <td className="px-4 py-3 border-0 loans-col-id" style={{ color: '#FF5B5B', fontWeight: '600' }}>Total</td>
              <td className="py-3 border-0 fw-bold loans-col-money" style={{ color: '#FF5B5B' }}>$1,250,000</td>
              <td className="py-3 border-0 fw-bold loans-col-left" style={{ color: '#FF5B5B' }}>$750,000</td>
              <td className="py-3 border-0 loans-col-duration"></td>
              <td className="py-3 border-0 loans-col-rate"></td>
              <td className="py-3 border-0 fw-bold loans-col-installment" style={{ color: '#FF5B5B' }}>$21,500 / month</td>
              <td className="py-3 border-0 loans-col-status"></td>
            </tr>
          </tbody>
        </Table>
      </Card>
      </div>
    </Container>
  );
}

export default LoansPage;
