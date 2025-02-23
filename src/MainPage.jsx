// src/MainPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      {/* Navbar */}
      <header>
        <div className="navbar">
          <ul>
            <li><a href="#">My Accounts & Profile</a></li>
            <li><a href="#">Payments / Transfers</a></li>
            <li><a href="#">Bill Payments</a></li>
            <li><a href="#">Fixed Deposit</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </header>

      {/* Notification */}
      <div className="notification">
        📢 Electronic transaction on <a href="#">1-800-425-3800</a> / <a href="#">1-800-11-2211</a> immediately. Longer the time taken to notify...
      </div>

      {/* Flex Container for Sidebar and Main Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><a href="#">Account Summary</a></li>
            <li><a href="#">Account Statement</a></li>
            <li><a href="#">Pending Statement</a></li>
            <li><a href="#">Spend Analyzer</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">e-Statement</a></li>
            <li><a href="#">Know your CIBIL Score</a></li>
            {/* Add a link to the Insurance Calculator */}
            <li>
              <Link to="/insurance-calculator">Insurance Calculator</Link>
            </li>
            {/* Add a link to the Recommendations Page */}
            <li>
              <Link to="/recommendations">Policy Recommendations</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="account-summary">
            <h2>Transaction Accounts</h2>
            <table className="account-table">
              <thead>
                <tr>
                  <th>Account No. / Nick Name</th>
                  <th>Branch</th>
                  <th>Available Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XXXXXXX</td>
                  <td>BATTARAHALLI</td>
                  <td><a href="#">Click here for balance</a></td>
                </tr>
              </tbody>
            </table>

            <h2>Deposit Accounts</h2>
            <table className="account-table">
              <thead>
                <tr>
                  <th>Account No. / Nick Name</th>
                  <th>Branch</th>
                  <th>Principal / Available Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XXXXXXX</td>
                  <td>BATTARAHALLI</td>
                  <td><a href="#">Click here for balance</a></td>
                </tr>
              </tbody>
            </table>

            <div className="features">
              <strong>FEATURES/OFFERS</strong><br />
              Get Realtime Pre-Approved Personal Loan through INB without visiting Branch.{" "}
              <a href="#" style={{ color: 'purple', textDecoration: 'underline' }}>
                Click Here to check eligibility
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Online SBI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;