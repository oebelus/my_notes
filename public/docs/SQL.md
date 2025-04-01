SQL databases (Structured Query Language), also known as relational databases, are based on the relational model introduced by E.F. Codd in 1970. They store data in tables with predefined schema and use SQL for querying and manipulation.

A SQL database would be more suitable than a NoSQL database in scenarios where **structured data, complex queries, and transactional integrity** are critical.

Some examples of SQL databases include:

- MySQL: open-source RDBMS (Relational Database Management System), widely used.
- PostgreSQL: open-source, known for its robustness and extensibility.
- Oracle: commercial RDBMS, used in enterprise applications.

Characteristics

- Structured Data -> predefined structure and strict schema;
- ACID Transactions -> Atomicity, Consistency, Isolation, Durability.
- Data Integrity -> through constraints (primary keys, unique... etc.).

### Relational Database Concepts

#### Tables

- Tables stores data in a structured format, they consist of rows (records) and columns (fields), and are defined with a schema that specifies the names of columns, data types, and constraints.

Tables under context context:

- **Relational Databases**: Tables are referred to as **relations** because they relate to one another.
- **Object-Oriented Databases (OODBs)**: Tables are called **entities** or **objects**, **attributes** in objects are analogous to columns in tables.

#### Rows

- Rows, or records, represent individual instances or occurrences of the entity represented by the table (a combination of column values). Each row in a table contains a unique set of values for the columns defined in the table’s schema.
- **Example**:
  - In an "Employee" table:
    - One row might represent an employee's ID, name, and role.

#### Columns

- Columns, or field, define the attributes or characteristics of the entity represented by the table.
- Each column has:
 	- A **unique name**.
 	- A **data type** (e.g., integer, string, date).
- Columns often have constraints (NOT NULL, UNIQUE).

#### Domains

- Domains are the set of permissible values for a column, to ensures data integrity by defining rules for each column.
- Examples:
 	- A numerical domain only accepts numbers.
 	- A string domain only accepts characters or text.

#### Relationships

- Relational databases allow tables to be related to each other through the use of primary keys and foreign keys, it enables data to be efficiently queried and combined from multiple tables, ensuring data integrity and eliminating redundancy.

#### Primary Key

- A unique identifier for each row in a table.
- **Characteristics**:
  - Must contain unique values.
  - Examples:
    - An `ID` column in an "Employee" table.
  - Composite Primary Key:
    - A combination of columns that uniquely identifies a row.
- **Importance**:
  - Ensures no duplicate records exist.

#### Foreign Key

- A column (or set of columns) in a table that establishes a relationship with another table (connects tables or references a unique key in another table)
- **Purpose**:
  - Enforces referential integrity by linking data across tables.
- **Example**:
  - Suppose we have two tables:
    - `Employee` table with `ID` as the primary key.
    - `Department` table with a `DepartmentID` column.
  - The `Employee` table can have a `DepartmentID` column as a **foreign key** that references the `DepartmentID` in the `Department` table.
- **Behavior**:
  - If a record in the referenced table (e.g., `Department`) is deleted, the database system may:
    - Restrict deletion (prevent deletion).
    - Cascade deletion (delete related rows in the referencing table).
- **Importance**:
  - Maintains consistency and prevents orphaned records (e.g., an employee assigned to a non-existent department).

#### Integrity Constraints

- Rules that every table in a database must follow to maintain data accuracy and consistency.
- **Types of Integrity Constraints**:
    1. **Key Constraints**:
        - Ensure that a column (or a set of columns) uniquely identifies each row in the table.
        - Example: A **primary key** cannot be `NULL` or duplicate.
        - In a "Student" table, the `StudentID` column can be a primary key since it is unique and never `NULL`.
    2. **Domain Constraints**:
        - Define the permissible values for a column based on its purpose and data type.
        - Example: A "Contact Number" column cannot exceed 10 digits, and a "First Name" column cannot store addresses.
    3. **Referential Integrity Constraints**:
        - Ensure the validity of relationships between tables using **foreign keys**.
        - Example: In a "Student" and "Department" table, if they are related via the `StudentID` column, the value in the foreign key column must exist in the referenced table.

#### Logical and Physical Database Structure

##### Logical Database Structure

- **Definition**: Represents the design and relationships of a database in a diagrammatic form using an **Entity Relationship Diagram (ERD)**.
- **Purpose**:
  - Provides a visual representation of entities, attributes, and relationships.
  - Helps transition from conceptual to physical database design in a DBMS (e.g., MySQL, Oracle).
- **Relationships Between Entities (Cardinality)**:
    1. **One-to-One Relationships**:
        - Each instance of an entity is related to exactly one instance of another entity.
        - Example: A "User" entity might have a one-to-one relationship with a "Profile" entity.
    2. **One-to-Many Relationships**:
        - An instance of one entity is related to multiple instances of another entity.
        - Example: A "Department" entity might relate to multiple "Student" entities.
    3. **Many-to-Many Relationships**:
        - Instances of one entity are related to multiple instances of another and vice versa.
        - Example: "Students" and "Courses" entities, where many students can enroll in many courses.
- **ERD Features**:
  - Entities (represented as rectangles).
  - Attributes (represented as ovals or listed within entities).
  - Relationships (depicted by connecting lines with labels for cardinality).

##### Physical Database Structure

- **Definition**: The implementation of the logical database design into actual tables and fields in a DBMS.
- **Relationships Between Tables**:
  - Established using **foreign keys**.
  - A **foreign key** in one table references the **primary key** of another table to define relationships.
- **Example**:
  - In a "Student" and "Department" database:
    - `Stud_id` is the **primary key** in the "Student" table.
    - `Stud_id` appears as a **foreign key** in the "Department" table, creating a relationship between the two.

### SQL

#### SQL Syntax and Structure

| Type                                 | Definition                                         | Operations             |
| ------------------------------------ | -------------------------------------------------- | ---------------------- |
| **Data Definition Language (DDL)**   | creating, modifying, and deleting database objects | CREATE, ALTER, DROP    |
| **Data Manipulation Language (DML)** | inserting, updating, and deleting data             | INSERT, UPDATE, DELETE |
| **Data Query Language (DQL)**        | retrieving data from tables                        | SELECT                 |
| **Data Control Language (DCL)**      | managing user access and permissions               | GRANT, REVOKE          |

#### SQL Data Types

| Name              | Examples                                                        |
| ----------------- | --------------------------------------------------------------- |
| **Numeric**       | `INTEGER`, `SMALLINT`, `BIGINT`, `DECIMAL`, `NUMERIC`, `FLOAT`. |
| **Character**     | `CHAR`, `VARCHAR`, `TEXT`.                                      |
| **Date and Time** | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`.                        |
| **Boolean**       | `BOOLEAN`.                                                      |

#### Basic SQL Operations

##### Creating a Table

```SQL
CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Email VARCHAR(100) UNIQUE,
  HireDate DATE
);
```

##### Inserting Data into a Table

```SQL
INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, HireDate)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', '2022-05-15');

INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, HireDate)
VALUES (2, 'Jane', 'Smith', 'jane.smith@example.com', '2021-08-22'),
       (3, 'Michael', 'Johnson', 'michael.johnson@example.com', '2023-02-01');
```

##### Selecting Data from a Table

```SQL
SELECT * FROM Employees;
```

```SQL
SELECT FirstName, LastName, Email FROM Employees;
```

#### CRUD Operations

##### DDL (Data Definition Language)

DDL statements are used to define and manage the structure of a database. Some common methods:

| Method         | Definition                                                                   | Example                                                                  |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `CREATE TABLE` | to create a new table with specified columns and data types.                 | `CREATE TABLE Customers (CustomerID INT PRIMARY KEY, Name VARCHAR(50));` |
| `ALTER TABLE`  | to modify an existing table, such as adding, modifying, or dropping columns. | `ALTER TABLE Customers ADD Address VARCHAR(200);`                        |
| `DROP TABLE`   | to delete an existing table and all its data.                                | `DROP TABLE Customers;`                                                  |

##### DML (Data Manipulation Language)

DML statements are used to manipulate data within database tables. Some common methods:

| Method   | Definition                                                                   | Example                                                                  |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `INSERT` | to add new records (rows) to a table.                                        | `CREATE TABLE Customers (CustomerID INT PRIMARY KEY, Name VARCHAR(50));` |
| `UPDATE` | to modify an existing table, such as adding, modifying, or dropping columns. | `ALTER TABLE Customers ADD Address VARCHAR(200);`                        |
| `DELETE` | to remove records from a table.                                              | `DELETE FROM Customers WHERE CustomerID = 1;`                            |
`JOIN` method example:

```SQL
SELECT 
 FirstName, 
    Email 
FROM 
 Students  
JOIN
 Orders
On Students.StudentID = Orders.CustomerID
WHERE
 orderdate > '2022-05-14';
```

#### Advanced SQL Techniques

##### DQL (Data Query Language)

DQL statements are used to retrieve data from database tables, query and filter it based on specific conditions.

| Method   | Definition                                                                      | Example                                                                                         |
| -------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `SELECT` | to retrieve data from one or more tables.                                       | `SELECT * FROM Customers;`                                                                      |
| `WHERE`  | to filter rows based on specified conditions.                                   | `SELECT * FROM Customers WHERE City = 'New York';`                                              |
| `JOIN`   | to combine rows from two or more tables based on a related column between them. | `SELECT Customers.Name FROM Customers JOIN Orders ON Customers.CustomerID = Orders.CustomerID;` |

##### Sorting and Filtering Data

###### Sorting

| Method     | Definition                  |
| ---------- | --------------------------- |
| `ORDER BY` | to specify the order.       |
| `ASC`      | to define ascending order.  |
| `DESC`     | to define descending order. |
By default, sorting is ascending (A to Z or lowest to highest for numbers).

```SQL
SELECT * FROM Products ORDER BY Price ASC;
```

###### Filtering

Filtering allows you to narrow down your data set based on specific criteria.

```SQL
SELECT * FROM Customers WHERE City = 'New York' AND Age > 25;

SELECT * FROM Orders WHERE OrderStatus = 'Shipped' AND OrderDate > '2023-01-01';
```

##### Complex Queries and Subqueries

Complex queries involve the use of multiple SQL clauses and operators to retrieve or manipulate data from one or more tables.

**Components of Complex Queries**:

| Method             | Definition                                                                       | Examples                                 |
| ------------------ | -------------------------------------------------------------------------------- | ---------------------------------------- |
| **Joins**          | combining data from multiple tables based on related columns using JOIN clauses. | `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`. |
| **Aggregation**    | grouping and summarizing data using aggregate functions.                         | `SUM`, `AVG`, `COUNT`.                   |
| **Subqueries**     | nesting queries within other queries to perform operations or filter data.       |                                          |
| **Set Operations** | combining results of multiple queries using set operators.                       | `UNION`, `INTERSECT`, `EXCEPT`.          |
|                    |                                                                                  |                                          |

1. *JOIN*

| JOIN           | Definition                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **INNER JOIN** | the most common type of JOIN, returns only rows where there’s a match in both tables based on the join condition. |
| **LEFT JOIN**  | includes all rows from the left table (specified before the JOIN keyword) and matching rows from the right table. |
| **RIGHT JOIN** | Same as above (invert LEFT with RIGHT).                                                                           |
| **FULL JOIN**  | returns all rows from both tables, regardless of whether there’s a match in the other table.                      |
Unmatched rows will have NULL values in the corresponding columns.

![JOINS](https://external-preview.redd.it/M5QHWsp2vgZ-3QDZ4m-qS58lsOUgDNHau8trSFzS8H0.jpg?auto=webp&s=cae9cdc438b71c9025d40dad4650801fdcae1ef8)

An example of an INNER JOIN:

```SQL
SELECT c.Name, o.OrderID, o.OrderDate
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID;
```

2. *Aggregation*
Examples: `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`.

```SQL
SELECT Department, COUNT(*) AS EmployeeCount FROM Employees GROUP BY Department;
SELECT ProductCategory, AVG(UnitPrice) AS AvgPrice FROM Products GROUP BY ProductCategory;
SELECT OrderDate, SUM(TotalAmount) AS TotalSales FROM Orders GROUP BY OrderDate;
```

3. *Subqueries*
Subqueries, nested queries or inner queries, are SQL queries nested within another query.

| Subquery                    | Definition                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **Single-row Subqueries**   | return a single value or row, used with single-row operators (e.g., =, >, <).                   |
| **Multiple-row Subqueries** | return multiple rows, used with multiple-row operators (e.g., IN, ANY, ALL).                    |
| **Correlated Subqueries**   | reference columns from the outer query within the subquery, allowing for correlated operations. |

```SQL
SELECT ProductName
FROM Products
WHERE UnitPrice > (SELECT AVG(UnitPrice) FROM Products);
```

##### DCL (Data Control Language)

DCL statements are used to manage user access and permissions within a database.

| Method   | Definition                                                                   | Example                                          |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| `GRANT`  | to grant specific privileges or roles to users or other roles                | `GRANT SELECT, INSERT ON Customers TO UserRole;` |
| `REVOKE` | return multiple rows, used with multiple-row operators (e.g., IN, ANY, ALL). | `REVOKE SELECT ON Customers FROM UserRole;`      |

```SQL
CREATE ROLE StudentAdmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON Students TO StudentAdmin;
CREATE USER 'admin_user' IDENTIFIED BY 'password123';
GRANT StudentAdmin TO 'admin_user';
```
