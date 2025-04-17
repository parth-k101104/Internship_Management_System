import pandas as pd
import mysql.connector

# === 1. Load Excel file ===
file_path = "D:\Parth\Projects\internship-management-system\server\cleaned_csbs.xlsx"  # Replace with actual file path
df = pd.read_excel(file_path)

# === 2. Define expected database columns ===
expected_columns = [
    'PRN', 'Name', 'email', 'phone', 'year', 'semester',
    'dept_id', 'category', 'company_name', 'stipend',
    'company_sup', 'school_sup'
]

# === 3. Normalize the column names to lowercase for case-insensitivity ===
df.columns = df.columns.str.strip().str.lower()  # Remove any leading/trailing spaces and convert to lowercase

# === 4. Normalize expected columns to lowercase for matching ===
normalized_expected_columns = [col.lower() for col in expected_columns]

# === 5. Add missing columns as None (NULL in SQL) ===
for col in normalized_expected_columns:
    if col not in df.columns:
        df[col] = None  # Add column with None (which will be treated as NULL in SQL)

# === 6. Reorder columns to match the expected database column structure ===
df = df[normalized_expected_columns]

# === 7. Connect to MySQL database ===
conn = mysql.connector.connect(
    host="localhost",
    user="root",         # Change to your DB user
    password="pk.101104", # Change to your DB password
    database="ims"
)
cursor = conn.cursor()

# === 8. Prepare dynamic SQL insert query ===
placeholders = ', '.join(['%s'] * len(normalized_expected_columns))
columns = ', '.join(normalized_expected_columns)
query = f"INSERT INTO students ({columns}) VALUES ({placeholders})"

# === 9. Insert rows from the DataFrame ===
for _, row in df.iterrows():
    values = tuple(row[col] if pd.notna(row[col]) else None for col in normalized_expected_columns)
    cursor.execute(query, values)

# === 10. Commit and close ===
conn.commit()
cursor.close()
conn.close()

print("✅ Data successfully inserted into 'students' table with case-insensitive column matching.")
