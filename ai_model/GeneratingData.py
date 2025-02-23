import pandas as pd
import numpy as np
from faker import Faker

# Initialize Faker
fake = Faker()

# Number of synthetic customers
num_customers = 1000

# Define categorical options
marital_status_options = ["Single", "Married", "Divorced", "Widowed"]
employment_type_options = ["Salaried", "Self-Employed", "Unemployed", "Retired"]
industry_options = ["IT", "Healthcare", "Finance", "Education", "Retail", "Manufacturing"]
payment_modes = ["Annual", "Monthly", "Quarterly"]
home_ownership_options = ["Owned", "Rented"]
car_ownership_options = ["Yes", "No"]
gender_options = ["Male", "Female", "Other"]
dependents_options = [0, 1, 2, 3, "3+"]
risk_tolerance_levels = ["Low", "Medium", "High"]
investment_goals = ["Retirement", "Education", "Wealth Growth", "Emergency Fund"]
existing_policies_options = [0, 1, 2, 3, "3+"]
health_conditions = ["Healthy", "Pre-existing Condition", "High Risk"]

# Generate synthetic customer data
data = {
    'customer_id': [fake.uuid4() for _ in range(num_customers)],
    'name': [fake.name() for _ in range(num_customers)],
    'gender': np.random.choice(gender_options, num_customers),
    'age': np.random.randint(18, 65, num_customers),
    'income': np.random.randint(300000, 2000000, num_customers),
    'location': [fake.city() for _ in range(num_customers)],
    'dependents': np.random.choice(dependents_options, num_customers),
    'risk_tolerance': np.random.choice(risk_tolerance_levels, num_customers),
    'existing_policies': np.random.choice(existing_policies_options, num_customers),
    'health_condition': np.random.choice(health_conditions, num_customers),
    'policy_type': np.random.choice(['Health', 'Life', 'Auto', 'Home'], num_customers),
    'coverage': np.random.randint(50000, 10000000, num_customers),  # Coverage amount in INR
    'policy_tenure': np.random.randint(1, 30, num_customers),  # Tenure in years
    'payable_insurance_amount': np.random.randint(5000, 50000, num_customers),
    'transaction_frequency': np.random.randint(1, 30, num_customers),
    'average_transaction_amount': np.random.randint(100, 10000, num_customers),
    'investment_goal': np.random.choice(investment_goals, num_customers),
    'claims_history': np.random.randint(0, 5, num_customers),
    'premium_amount': np.random.randint(5000, 50000, num_customers),
    
    # Additional fields from first dataset
    'marital_status': np.random.choice(marital_status_options, num_customers),
    'employment_type': np.random.choice(employment_type_options, num_customers),
    'industry': np.random.choice(industry_options, num_customers),
    'loan_obligations': np.random.randint(0, 1000000, num_customers),  # Outstanding loans
    'credit_score': np.random.randint(300, 900, num_customers),  # Credit score range
    'savings_amount': np.random.randint(50000, 5000000, num_customers),  # Annual savings in INR
    'monthly_expenses': np.random.randint(20000, 200000, num_customers),  # Monthly spending
    'preferred_payment_mode': np.random.choice(payment_modes, num_customers),
    'policy_claim_frequency': np.random.randint(0, 5, num_customers),  # Claims in last 5 years
    'home_ownership': np.random.choice(home_ownership_options, num_customers),
    'car_ownership': np.random.choice(car_ownership_options, num_customers),
    'emergency_fund_availability': np.random.randint(10000, 1000000, num_customers)  # Emergency savings
}

# Create DataFrame
df = pd.DataFrame(data)

# Example: Adding correlation between income and premium amount
df['premium_amount'] = df['income'] * 0.02 + np.random.normal(0, 5000, num_customers)

# Display the first few rows
print("Final Combined Synthetic Data:")
print(df.head())

# Save dataset to CSV
df.to_csv("final_combined_customer_data.csv", index=False)
print("Dataset saved as 'final_combined_customer_data.csv'")