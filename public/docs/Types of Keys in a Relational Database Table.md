## 1. Key Attribute

- A value that uniquely identifies an individual record in a table.
- **Example**: In a "Staff" table, `StaffID` serves as the key attribute, as each `StaffID` is unique.

---

## 2. Candidate Key

- Any attribute (or combination of attributes) with a unique value in each row of the table.
- **Example**:
  - In the "Staff" table, both `StaffID` and `ContactNumber` are candidate keys because they uniquely identify rows.
- **Non-Key Attributes**: Columns that do not have unique values are designated as non-key attributes.

---

## 3. Primary Key

- A selected candidate key that serves as the main unique identifier for a table.
- **Rules**:
  - Must be unique.
  - Cannot have `NULL` values.
- **Example**: `StaffID` is the primary key in the "Staff" table.

---

## 4. Alternate Key

- Also known as a **secondary key**.
- A candidate key not chosen as the primary key but still holds unique values.
- **Example**: In the "Staff" table, `ContactNumber` is an alternate key if `StaffID` is the primary key.

---

## 5. Composite Key

- A key that is formed by combining two or more attributes to create a unique identifier.
- Used when a single attribute cannot serve as a unique key.
- **Example**: In the "Staff" table, a combination of `StaffName` and `StaffTitle` can form a composite key (assuming no duplicate combinations exist).

---

## 6. Foreign Key

- An attribute in one table that references a unique key (typically the primary key) in another table.
- Used to establish relationships between tables.
- **Example**:  
  - In a "College" database:
    - `StaffID` in the "StaffDetails" table might be a foreign key referencing the `StaffID` primary key in the "Staff" table.
