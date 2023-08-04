import React from 'react';

export default function Nav() {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");
    console.log("Search Term:", searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand ms-4 mr-2" href="/"><strong>YT Streamers</strong></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mr-2">
            <form className="d-flex" onSubmit={handleFormSubmit}>
              <input className="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" style={{ width: "500px" }} />
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}
