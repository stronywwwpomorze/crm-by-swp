import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaList } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            <FaHome className="me-2" />
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dodaj">
            <FaPlus className="me-2" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/lista">
            <FaList className="me-2" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
