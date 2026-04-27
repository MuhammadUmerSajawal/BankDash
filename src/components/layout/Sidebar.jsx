import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  HiOutlineHome,
  HiOutlineArrowsRightLeft,
  HiOutlineUser,
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
  HiOutlineLifebuoy,
  HiOutlineCog6Tooth,
  HiOutlineReceiptPercent,
} from "react-icons/hi2";

const navItems = [
  { label: "Dashboard", icon: HiOutlineHome, path: "/" },
  { label: "Transactions", icon: HiOutlineArrowsRightLeft, path: "/transactions" },
  { label: "Accounts", icon: HiOutlineUser, path: "/accounts" },
  { label: "Investments", icon: HiOutlineGlobeAlt, path: "/investments" },
  { label: "Credit Cards", icon: HiOutlineReceiptPercent, path: "/credit-cards" },
  { label: "Loans", icon: HiOutlineBriefcase, path: "/loans" },
  { label: "Services", icon: HiOutlineLifebuoy, path: "/services" },
  { label: "Setting", icon: HiOutlineCog6Tooth, path: "/settings" },
];

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
        {/* Brand Logo */}
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          <span className="sidebar__logo-stack" />
          <span className="sidebar__logo-card" />
        </div>
        <h2 className="m-0 fs-5 fw-bold" style={{ color: '#232b5d' }}>BankDash.</h2>
      </div>

        {/* Navigations  */} 
      <div className="sidebar__nav mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " is-active" : ""}`
            }
            onClick={onNavigate}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
