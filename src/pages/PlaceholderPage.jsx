import React from "react";
import { Container, Card } from "react-bootstrap";

function PlaceholderPage({ title }) {
  return (
    <Container fluid className="content__body">
      <h2 className="fs-4 fw-bold mb-3" style={{ color: '#232b5d' }}>{title}</h2>
      <Card className="dashboard-panel border-0 p-5 text-center">
        <p className="text-secondary">This page is currently under development.</p>
      </Card>
    </Container>
  );
}

export default PlaceholderPage;
