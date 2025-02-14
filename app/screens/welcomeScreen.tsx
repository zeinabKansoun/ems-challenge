import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to your logo file

const WelcomeScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1>Welcome to EMS</h1>
      <div style={styles.buttonContainer}>
        <Link to="/employees">
          <button style={styles.button}>View Employees</button>
        </Link>
        <Link to="/timesheets">
          <button style={styles.button}>View Timesheets</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
  },
  logo: {
    width: '200px',
    height: '200px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default WelcomeScreen;