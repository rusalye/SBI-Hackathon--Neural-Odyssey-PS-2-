// src/Recommendations.jsx
import React, { useState } from 'react';
import styles from './index.css';

const Recommendations = () => {
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user input
    const age = e.target.age.value;
    const income = e.target.income.value;
    const savingsRate = e.target.savings_rate.value;
    const policyCount = e.target.policy_count.value;

    // Prepare data for the API
    const data = {
      age: parseInt(age),
      income: parseInt(income),
      savings_rate: parseInt(savingsRate),
      policy_count: parseInt(policyCount),
    };

    try {
      // Send data to the backend API
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response
      const result = await response.json();

      // Display the result
      setResult(`Recommended Policy: ${result.policy}`);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again.');
    }
  };

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
            <li>
              <a href="/insurance-calculator">Insurance Calculator</a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className={styles.container}>
            <h1>Policy Recommendation System</h1>
            <form id="prediction-form" onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="income">Income:</label>
                <input type="number" id="income" name="income" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="savings_rate">Savings Rate (%):</label>
                <input type="number" id="savings_rate" name="savings_rate" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="policy_count">Policy Count:</label>
                <input type="number" id="policy_count" name="policy_count" required />
              </div>
              <button type="submit" className={styles.button}>
                Get Recommendation
              </button>
            </form>
            <div id="result" className={styles.result}>
              {result}
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

export default Recommendations; 