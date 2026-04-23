import React from "react";

function PageCard({ children, eyebrow, heading, description, fullWidth }) {
  return (
    <div className={`page-card ${fullWidth ? "page-card--full" : ""}`}>
      {(eyebrow || heading || description) && (
        <div className="page-card__header">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {heading && <h2>{heading}</h2>}
          {description && <p className="page-card__description">{description}</p>}
        </div>
      )}
      <div className="page-card__body">{children}</div>
    </div>
  );
}

export default PageCard;
