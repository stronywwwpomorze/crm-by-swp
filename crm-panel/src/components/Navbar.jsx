import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">CRM by SWP</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dodaj">Dodaj klienta</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/lista">Lista klientów</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
