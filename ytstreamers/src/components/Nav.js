import React from "react";
import "./Nav.css";

export default function Nav(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");
    console.log("Search Term:", searchTerm);
    props.Item(searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <img className="card-img-top custom-logo" src="/wave.svg" alt="logo" />
      <a className="navbar-brand ms-2 fs-3 custom-brand" href="/">
        <strong>YT Streamers</strong>
      </a>
      <div
        className="mt-2"
        onClick={() =>
          props.setcurrentmode(props.currentmode === "dark" ? "light" : "dark")
        }
      >
        {props.currentmode === "dark" ? (
          <i className="fas fa-sun fa-xl" style={{ color: "white" }}></i>
        ) : (
          <i className="far fa-moon fa-xl" style={{ color: "white" }}></i>
        )}
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mr-2">
            <form className="d-flex" onSubmit={handleFormSubmit}>
              <div className="input-group custom-input-group">
                <span className="input-group-text custom-input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="form-control custom-form-control"
                  type="search"
                  name="search"
                  placeholder="Search Among 100,000+ YouTube Videos"
                  aria-label="Search Among 100,000+ YouTube Videos"
                  autoComplete="off"
                />
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}
