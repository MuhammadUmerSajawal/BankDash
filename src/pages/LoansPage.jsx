import React from "react";
import { Container, Card, Table, Row, Col } from "react-bootstrap";
import { HiOutlineUser, HiOutlineGlobeAlt, HiOutlineArrowPath, HiOutlineBriefcase } from "react-icons/hi2";

const loanSummary = [
  { label: "Personal Loans", value: "$50,000", icon: HiOutlineUser, color: "#FF82AC", bg: "#FFE0EB" },
  { label: "Corporate Loans", value: "$100,000", icon: HiOutlineBriefcase, color: "#396AFF", bg: "#E7EDFF" },
  { label: "Business Loans", value: "$500,000", icon: HiOutlineGlobeAlt, color: "#FFBB38", bg: "#FFF5D9" },
  { label: "Custom Loans", value: "$250,000", icon: HiOutlineArrowPath, color: "#16C9B8", bg: "#DCFAF8" },
];

function LoansPage() {
  return (
    <Container fluid className="content__body">
      <Row className="mb-4 motion-section motion-delay-1">
        {loanSummary.map((item, i) => (
          <Col lg={3} sm={6} key={i} className="mb-3">
             <Card className="dashboard-panel border-0">
               <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: item.bg, color: item.color }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-secondary small">{item.label}</div>
                    <div className="fw-bold fs-5">{item.value}</div>
                  </div>
               </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="motion-section motion-delay-2">
      <h2 className="fs-4 fw-bold mb-3" style={{ color: '#232b5d' }}>Active Loans Overview</h2>
      <Card className="dashboard-panel border-0 p-0 overflow-hidden">
        <Table responsive hover className="m-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0">SL No</th>
              <th className="py-3 border-0">Loan Money</th>
              <th className="py-3 border-0">Left to Pay</th>
              <th className="py-3 border-0">Duration</th>
              <th className="py-3 border-0">Interest Rate</th>
              <th className="py-3 border-0">Installment</th>
              <th className="py-3 border-0 text-end px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "01.", money: "$100,000", left: "$40,500", duration: "8 Months", rate: "12%", installment: "$2,000 / month", status: "Repay" },
              { id: "02.", money: "$50,000", left: "$25,250", duration: "6 Months", rate: "10%", installment: "$800 / month", status: "Repay" },
              { id: "03.", money: "$900,000", left: "$500,000", duration: "12 Months", rate: "14%", installment: "$5,000 / month", status: "Repay" },
            ].map((loan, i) => (
              <tr key={i}>
                <td className="px-4 py-3 border-0">{loan.id}</td>
                <td className="py-3 border-0 fw-semibold">{loan.money}</td>
                <td className="py-3 border-0">{loan.left}</td>
                <td className="py-3 border-0">{loan.duration}</td>
                <td className="py-3 border-0">{loan.rate}</td>
                <td className="py-3 border-0">{loan.installment}</td>
                <td className="py-3 border-0 text-end px-4">
                  <button className="btn btn-outline-primary btn-sm rounded-pill px-3">{loan.status}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      </div>
    </Container>
  );
}

export default LoansPage;
