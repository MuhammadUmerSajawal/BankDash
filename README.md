# BankDash Frontend

A polished banking dashboard frontend built with React and Vite, inspired by modern fintech admin panels.

This project includes a multi-page dashboard experience with responsive layouts, reusable page-level styling, SVG-based charts, and lightweight client-side interactions for common banking UI flows.

## Overview

BankDash is a frontend-focused dashboard application that recreates a banking product interface with:

- Overview dashboard
- Transactions
- Accounts
- Investments
- Credit Cards
- Loans
- Services
- Settings

The UI is designed to feel clean, modern, and product-oriented while keeping the codebase easy to extend.

## Tech Stack

- React 18
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap 5
- React Icons
- Custom scoped CSS modules by page folder pattern

## Features

- Responsive banking dashboard layout with sidebar and top navigation
- Reusable shared layout and component styling
- Page-scoped CSS for better maintainability
- SVG charts for:
  - Weekly activity
  - Balance history
  - Debit and credit overview
  - Investments analytics
  - Expense and card statistics
- Interactive frontend behaviors such as:
  - Transactions filtering
  - Settings tab switching
  - Settings toggle switches
  - Quick transfer contact selection
  - Add-card form interaction
  - Downloadable transaction receipts
  - Service and card row selection states

## Project Structure

```text
src/
  app/
    routes.jsx
  components/
    layout/
      Header.jsx
      Sidebar.jsx
  pages/
    Dashboard.jsx
    TransactionsPage.jsx
    AccountsPage.jsx
    InvestmentsPage.jsx
    CreditCardsPage.jsx
    LoansPage.jsx
    ServicesPage.jsx
    SettingsPage.jsx
  styles/
    app.css
    dashboard.css
    transactions.css
    accounts.css
    investments.css
    credit-cards.css
    services.css
    settings.css
  App.jsx
  index.jsx
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Styling Approach

The project uses a hybrid styling approach:

- Bootstrap and React Bootstrap for layout primitives and utility support
- Shared global styles in `src/styles/app.css`
- Page-specific styles in `src/styles/*.css`
- Minimal `src/index.css` for root/global reset behavior

This keeps the UI consistent while preventing one large stylesheet from becoming hard to maintain.

## Routing

Client-side routing is handled with `react-router-dom` via `src/app/routes.jsx`.

Current routes:

- `/`
- `/transactions`
- `/accounts`
- `/investments`
- `/credit-cards`
- `/loans`
- `/services`
- `/settings`

## Notes

- This is a frontend project focused on UI and interaction behavior.
- Data is currently mocked in the page components.
- Charts are rendered with custom SVG rather than a chart library to keep the visuals flexible and lightweight.
- The structure separates app wiring, layout shell, pages, and page-scoped styles for easier scaling.

## Future Improvements

- Move mock data into a dedicated `data/` layer
- Add reusable chart components
- Add stronger form validation
- Improve accessibility and keyboard interaction states
- Add unit and component tests
- Connect pages to a real backend/API

## Author

Built as a React frontend banking dashboard project by Muhammad Umer Sajawal.
