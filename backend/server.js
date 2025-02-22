const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Validate duration endpoint
app.post("/api/validate-duration", (req, res) => {
  const { duration } = req.body;

  // Validate duration
  if (!duration || isNaN(duration) || duration <= 0) {
    return res.status(400).json({ success: false, error: "Invalid duration value." });
  }

  // Return success response
  return res.json({ success: true, duration });
});

// Calculate statistics endpoint
app.post("/api/calculate", async (req, res) => {
  const { income, payableAmount, policyType, coverage, duration } = req.body;

  // Validate input
  if (!income || !payableAmount || !policyType || !coverage || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const durationValue = parseInt(duration, 10);
  if (isNaN(durationValue)) {
    return res.status(400).json({ error: "Invalid duration value." });
  }

  try {
    // Read policies from CSV file
    const policies = await readCSV("policies.csv");

    // Filter policies based on criteria
    const filteredPolicies = policies.filter(
      (policy) =>
        policy.policyType === policyType &&
        parseFloat(policy.minPremium) <= parseFloat(payableAmount) &&
        parseFloat(policy.coverage) >= parseFloat(coverage)
    );

    if (filteredPolicies.length === 0) {
      throw new Error("No policies match your criteria.");
    }

    // Calculate total benefits for each policy
    const results = filteredPolicies.map((policy) => {
      const totalBenefits = parseFloat(coverage) * parseFloat(policy.interestRate) * durationValue;
      return {
        policyName: policy.policyName,
        interestRate: parseFloat(policy.interestRate),
        totalBenefits,
        duration: durationValue,
      };
    });

    // Return success response
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error in /api/calculate:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fetch policies endpoint
app.get("/api/policies", async (req, res) => {
  try {
    const policies = await readCSV("policies.csv");
    res.json(policies);
  } catch (err) {
    console.error("Error fetching policies:", err.message);
    res.status(500).json({ error: "Failed to fetch policies." });
  }
});

// Helper function to read CSV file
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});