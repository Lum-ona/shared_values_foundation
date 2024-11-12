import React from "react";
import "./Header.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container">
        <div className="header-container d-flex align-items-center justify-content-between">
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto active" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/">
                  About Us
                </Link>
              </li>

              <li>
                <Link className="nav-link scrollto" to="/">
                  Objectives
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/">
                  SCAPII
                </Link>
              </li>

              <li>
                <Link className="nav-link scrollto" to="/">
                  Where we work
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/">
                  Community
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/">
                  Approach
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/">
                  Programmes
                </Link>
              </li>

              <li>
                <Link className="nav-link scrollto" to="/">
                  Team
                </Link>
              </li>
              <li>
                <a
                  className="nav-link scrollto"
                  href="./assets/img/Newsletter.pdf"
                >
                  Newsletter
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" className="img-fluid" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
