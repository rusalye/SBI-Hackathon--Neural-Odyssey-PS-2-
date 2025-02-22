import { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import PolicyComparison from './components/PolicyComparison';
import Statistics from './components/Statistics';

const InsuranceCalculator = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [statisticsData, setStatisticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch policies on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/policies')
      .then((response) => {
        console.log('Policies fetched:', response.data);
        setPolicies(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching policies:', error);
        setError('Failed to fetch policies. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Validate duration
  const fetchData = async (duration) => {
    try {
      const response = await axios.post('http://localhost:5000/api/validate-duration', { duration });
      if (!response.data.success) {
        setError('Invalid duration value.');
        return null;
      }
      return response.data.duration;
    } catch (error) {
      console.error('Error validating duration:', error);
      setError('Failed to validate duration. Please check your input.');
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (data) => {
    if (!selectedPolicy) {
      setError('Please select a policy.');
      return;
    }

    // Validate duration
    const validatedDuration = await fetchData(data.duration);
    if (!validatedDuration) return;

    const payload = {
      policyId: selectedPolicy.policyName,
      income: parseFloat(data.income),
      payableAmount: parseFloat(data.payableAmount),
      policyType: selectedPolicy.policyType,
      coverage: parseFloat(data.coverage),
      duration: validatedDuration,
    };

    console.log('Payload being sent to backend:', payload);

    setLoading(true);
    axios
      .post('http://localhost:5000/api/calculate', payload)
      .then((response) => {
        console.log('Backend response:', response.data);
        setStatisticsData(response.data.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error calculating statistics:', error);
        setError('Failed to calculate statistics. Please check your inputs.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="header">
        <h1>Insurance Calculator</h1>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Flex container for input form and graph */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Input Form (Left Side) */}
        <div className="w-full md:w-1/2">
          {!loading && (
            <InputForm
              policies={policies}
              selectedPolicy={selectedPolicy}
              onSelectPolicy={setSelectedPolicy}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Graph (Right Side) */}
        <div className="w-full md:w-1/2 graph-container">
          {statisticsData && <Statistics data={statisticsData} />}
        </div>
      </div>

      {/* Policy Comparison (Below Input Form and Graph) */}
      {policies.length > 0 && (
        <div className="policy-comparison">
          <h2>Policy Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {policies.map((policy) => (
              <div key={policy.policyName} className="policy-card">
                <h3>{policy.policyName}</h3>
                <p>Type: {policy.policyType}</p>
                <p>Coverage: ${policy.coverage}</p>
                <p>Interest Rate: {policy.interestRate * 100}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2023 Insurance Calculator. All rights reserved.</p>
      </div>
    </div>
  );
};

export default InsuranceCalculator;