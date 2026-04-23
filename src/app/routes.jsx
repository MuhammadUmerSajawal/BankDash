import Dashboard from "../pages/Dashboard";
import AccountsPage from "../pages/AccountsPage";
import TransactionsPage from "../pages/TransactionsPage";
import InvestmentsPage from "../pages/InvestmentsPage";
import CreditCardsPage from "../pages/CreditCardsPage";
import LoansPage from "../pages/LoansPage";
import ServicesPage from "../pages/ServicesPage";
import SettingsPage from "../pages/SettingsPage";

export const appRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    title: "Overview",
  },
  {
    path: "/transactions",
    element: <TransactionsPage />,
    title: "Transactions",
  },
  {
    path: "/accounts",
    element: <AccountsPage />,
    title: "Accounts",
  },
  {
    path: "/investments",
    element: <InvestmentsPage />,
    title: "Investments",
  },
  {
    path: "/credit-cards",
    element: <CreditCardsPage />,
    title: "Credit Cards",
  },
  {
    path: "/loans",
    element: <LoansPage />,
    title: "Loans",
  },
  {
    path: "/services",
    element: <ServicesPage />,
    title: "Services",
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    title: "Setting",
  },
];

export const defaultRoute = appRoutes[0];
