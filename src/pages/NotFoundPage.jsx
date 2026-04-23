import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page" style={{ textAlign: "center", padding: "48px" }}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#2d60ff", fontWeight: "600" }}>Go back home</Link>
    </div>
  );
}

export default NotFoundPage;
