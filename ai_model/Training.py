import pandas as pd
import numpy as np
import xgboost as xgb
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
from sklearn.metrics import accuracy_score, classification_report

# Load the dataset
df = pd.read_csv("customer_data.csv")  # Change this to your actual file path

# Drop unnecessary columns (IDs and directly related to target)
drop_cols = ["customer_id", "name", "existing_policies"]  # Modify if needed
df = df.drop(columns=drop_cols, errors="ignore")

# Define Target Variable
target_column = "policy_type"  # The column to predict
if target_column not in df.columns:
    raise ValueError("Target column 'policy_type' not found in dataset!")

# Encode Target Variable
label_encoder = LabelEncoder()
df[target_column] = label_encoder.fit_transform(df[target_column])  # Convert categories to numbers
class_labels = label_encoder.classes_  # Store class names before splitting

# Identify Categorical and Numerical Columns
categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()
numerical_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
numerical_cols.remove(target_column)  # Remove target column from numerical list

# Fill Missing Values
for col in numerical_cols:
    df[col] = df[col].fillna(df[col].median())  # Fill numerical columns with median

for col in categorical_cols:
    df[col] = df[col].fillna(df[col].mode()[0])  # Fill categorical columns with mode

# Convert Categorical Columns to Numerical using Label Encoding
for col in categorical_cols:
    df[col] = label_encoder.fit_transform(df[col])

# Feature Scaling (Standardization)
scaler = StandardScaler()
df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

# Splitting Data
X = df.drop(columns=[target_column])  # Features
y = df[target_column]  # Target variable

# Handle Class Imbalance using SMOTE
smote = SMOTE(sampling_strategy="auto", random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Split into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42, stratify=y_resampled)

# Hyperparameter Tuning using GridSearchCV
xgb_model = xgb.XGBClassifier(objective="multi:softmax", num_class=len(np.unique(y)), eval_metric="mlogloss")

param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [3, 5, 7],
    "learning_rate": [0.01, 0.1, 0.2],
    "subsample": [0.8, 1.0]
}

grid_search = GridSearchCV(xgb_model, param_grid, scoring="accuracy", cv=5, verbose=1, n_jobs=-1)
grid_search.fit(X_train, y_train)

# Best Model
best_model = grid_search.best_estimator_

# Cross-Validation Score
cv_scores = cross_val_score(best_model, X_train, y_train, cv=5)
print(f"Cross-Validation Accuracy: {np.mean(cv_scores):.4f}")

# Model Evaluation
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {accuracy:.4f}")

# Generate Classification Report
print("Classification Report:\n", classification_report(y_test, y_pred, target_names=class_labels))

# Feature Importance Plot
plt.figure(figsize=(10, 6))
xgb.plot_importance(best_model, importance_type="gain", max_num_features=10)
plt.title("Top 10 Feature Importances")
plt.show()
