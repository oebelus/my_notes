Normalization aims to reduce data duplication, prevent errors during modifications, and simplify querying in databases.

The three fundamental normalization forms are known as:

- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)

### First Normal Form (1NF)

\> *Definition*: Ensures data atomicity by storing only single values in each table cell and removing repeating groups to avoid data Inconsistency and redundancy.

\> *Example*:

Before 1NF:

```sql
CREATE TABLE Orders (
    OrderID INT,
    CustomerName VARCHAR(100),
    Products VARCHAR(255) -- Stores multiple products in one cell
);

INSERT INTO Orders VALUES (1, 'Alice', 'Product1, Product2, Product3');
```

**Issue**: Products are not atomic (multiple values in one cell).

After 1NF:

```sql
CREATE TABLE Orders (
    OrderID INT,
    CustomerName VARCHAR(100),
    Product VARCHAR(100) -- Each product is in its own row
);

INSERT INTO Orders VALUES (1, 'Alice', 'Product1');
INSERT INTO Orders VALUES (1, 'Alice', 'Product2');
INSERT INTO Orders VALUES (1, 'Alice', 'Product3');
```

### Second Normal Form (2NF)

*Definition*: Builds on 1NF by eliminating partial dependencies.

- Partial dependency occurs when a non-key column depends only on part of a composite primary key.

\> *Example*:

Before 2NF:

```sql
CREATE TABLE OrderDetails (
    OrderID INT,
    ProductID INT,
    ProductName VARCHAR(100),
    CustomerName VARCHAR(100)
);

INSERT INTO OrderDetails VALUES (1, 101, 'Product1', 'Alice');
INSERT INTO OrderDetails VALUES (1, 102, 'Product2', 'Alice');
```

**Issue**: `CustomerName` depends only on `OrderID`, not on the full composite key (`OrderID, ProductID`).

After 2NF:

```sql
CREATE TABLE Orders (
    OrderID INT,
    CustomerName VARCHAR(100)
);

CREATE TABLE OrderProducts (
    OrderID INT,
    ProductID INT,
    ProductName VARCHAR(100)
);

INSERT INTO Orders VALUES (1, 'Alice');
INSERT INTO OrderProducts VALUES (1, 101, 'Product1');
INSERT INTO OrderProducts VALUES (1, 102, 'Product2');
```

### Third Normal Form (3NF)

*Definition*: Builds on 2NF by eliminating transitive dependencies.

- Transitive dependency occurs when a non-key column depends on another non-key column instead of directly on the primary key.

\> *Example*:

Before 3NF:

```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    DepartmentID INT,
    DepartmentName VARCHAR(100) -- Depends on DepartmentID, not EmployeeID
);

INSERT INTO Employees VALUES (1, 10, 'Sales');
INSERT INTO Employees VALUES (2, 20, 'HR');
```

**Issue**: `DepartmentName` depends on `DepartmentID`, not directly on `EmployeeID`.

After 3NF:

```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    DepartmentID INT
);

CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

INSERT INTO Employees VALUES (1, 10);
INSERT INTO Employees VALUES (2, 20);

INSERT INTO Departments VALUES (10, 'Sales');
INSERT INTO Departments VALUES (20, 'HR');
```
