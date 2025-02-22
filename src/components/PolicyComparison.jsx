const PolicyComparison = ({ policies, income, payableAmount }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Policy Comparison</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Policy Name</th>
            <th className="p-2 border">Premium</th>
            <th className="p-2 border">Coverage</th>
            <th className="p-2 border">Duration</th>
            <th className="p-2 border">Total Cost</th>
            <th className="p-2 border">Benefits</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.policyName} className="border">
              <td className="p-2 border">{policy.policyName}</td>
              <td className="p-2 border">${policy.minPremium}</td>
              <td className="p-2 border">${policy.coverage}</td>
              <td className="p-2 border">{policy.duration} years</td>
              <td className="p-2 border">${policy.minPremium * policy.duration}</td>
              <td className="p-2 border">${policy.coverage * policy.interestRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyComparison;