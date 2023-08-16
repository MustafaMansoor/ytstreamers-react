import React from "react";

export default function Nav(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");
    console.log("Search Term:", searchTerm);
    props.Item(searchTerm);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top "
      style={{ height: "70px" }}
    >
      <img
        className="card-img-top"
        src="/wave.svg"
        alt="logo"
        style={{
          objectFit: "cover",
          height: "30px",
          width: "30px",
          marginLeft: "10px",
        }}
      />
      <a className="navbar-brand ms-4 mr-2 fs-3" href="/">
        <strong>YT Streamers</strong>
      </a>
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
              <div
                className="input-group"
                style={{
                  width: "600px",
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                  marginRight:"15px"
                }}
              >
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0.375rem 0.75rem",
                  }}
                >
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="form-control border-0"
                  type="search"
                  name="search"
                  placeholder="Search Among 100,000+ YouTube Videos"
                  aria-label="Search Among 100,000+ YouTube Videos"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "5px",
                    padding: "0.375rem 0.75rem",
                    outline: "none",
                    boxShadow: "none"
                  }}
                />
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}
