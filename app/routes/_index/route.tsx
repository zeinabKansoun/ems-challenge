import { Link } from "react-router";
import './index.css'; // Import the CSS file

export async function loader() {
  // This redirects to the employees page.
  // If you want to create a home page with navigation buttons
  // to the employees page, you can remove the redirection.
  return null;
}

export default function RootPage() {
  return (
    <div className="container">
      {/* <img className="logo" src={logo} alt="Logo" /> */}
      <h1>Welcome to EMS</h1>
      <div className="buttonContainer">
        <Link to="/employees">
          <button>View Employees</button>
        </Link>
        <Link to="/timesheets">
          <button>View Timesheets</button>
        </Link>
      </div>
    </div>
  );
}
