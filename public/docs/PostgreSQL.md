### 1. What is PostgreSQL?

PostgreSQL is a lightweight, free, and open-source relational database management system.

### 2. What are the benefits of PostgreSQL?

- Robustness that makes it suitable for all kinds of applications,
- Free and open-source,
- Security and reliability
- Wide variety of data types,
- A big community of users worldwide.

### 3. What are the main applications of PostgreSQL?

PostgreSQL allows you to:

- Create, delete, and update tables in a database,
- Access, manipulate, and modify data in a table,
- Retrieve and summarize the necessary information from a table or several tables,
- Add or remove certain rows or columns from a table

### 4. What is `pgAdmin` in PostgreSQL?

`pgAdmin` is a handy utility that comes with the PostgreSQL installation, and it lets you do regular database-related tasks through a nice graphical interface.

### 5. How can you create a new database in PostgreSQL?

### 6. How can you add new values to a certain table?

```SQL
INSERT INTO
```

### 7. How can you delete a database in PostgreSQL?

```SQL
DROP DATABASE
```

### 8. What is a schema in PostgreSQL?

A database schema contains the logical and visual configuration of the entire relational database.
In PostgreSQL, it includes the tables, along with the data types, views, indexes, sequences, constraints, and functions.

### 9. How can you select the five first rows in a table called ‘customers’ in PostgreSQL?

```sql
SELECT * FROM customers LIMIT 5;
```

### 10. What is a constraint in PostgreSQL?

Constraints are rules applied to columns in a table to ensure the validity and integrity of the data. They restrict the type of data that can be inserted into a table.

*Type of constraints:*

- `NOT NULL`: Ensures that a column cannot have `NULL` values.
- `UNIQUE`: Ensures that all values in a column are different.
- `CHECK`: Ensures that all values in a column satisfy a specific condition.
- `DEFAULT`: Provides a default value for a column when no value is specified.
- `FOREIGN KEY`: Ensures referential integrity between two tables.
- `PRIMARY KEY`: Ensures the uniqueness and non-nullability of a column or set of columns.

```sql
CREATE TABLE products ( 
 product_id SERIAL PRIMARY KEY, 
 product_name VARCHAR(100) NOT NULL, 
 price NUMERIC CHECK (price > 0), 
 UNIQUE (product_name) 
);
```

### 11. What is a join in PostgreSQL?

Joins are used to combine and retrieve records from two or multiple tables.

### 12. What is a primary key in PostgreSQL?

A primary key is used to identify a row uniquely in a table.
 - Each table can have only one primary key, which ensures that each record can be uniquely distinguished from others.
*Characteristics:*

- Uniqueness
- Non-null
- Immutable

```sql
CREATE TABLE users (
 user_id SERIAL PRIMARY KEY,
 username VARCHAR(50) NOT NULL,
 email VARCHAR(100) NOT NULL
);
```

### 13. What is a foreign key in PostgreSQL?

A field in one table that refers to the primary key in another table.
 - It establishes a relationship between two tables.
*Characteristics:*

- Referential integrity: A foreign key in one table must match a primary key in another table or be `NULL`.
- Multi-table relationships: Foreign keys can be used to create one-to-many or many-to-many relationships between tables.

```sql
CREATE TABLE orders (
 order_id SERIAL PRIMARY KEY,
 user_id INT,
 order_date DATE, 
 FOREIGN KEY (user_id) REFERENCES users(user_id)
)
```

Here, `user_id` in the `orders` table is a foreign key that references the `user_id` primary key in the `users` table.

### 14. Is PostgreSQL compatible with Python?

Yes, there are many packages available that allow you to use PostgreSQL through Python. `Psycopg` is one of the most popular Python libraries for PostgreSQL.

### 15. What is the difference between a foreign key and a primary key in PostgreSQL?

A foreign key provides shared keys between two or more tables, whereas a primary key allows only unique and strictly non-null values. Both are considered types of constraints.

### 16. What is the latest version of PostgreSQL?

As of January 2024, the latest version is PostgreSQL 16.

### 17. What is Multi-version Concurrency Control in PostgreSQL?

Multi-version Concurrency Control or MVCC is an advanced technique in PostgreSQL.

MVCC creates multiple versions of a single database record, enabling various transactions to access different versions of one database record without conflicting with one another, thereby allowing simultaneous transitions.

### 18. What is the maximum size for a table in PostgreSQL?

While PostgreSQL provides unlimited database size, there is a maximum size for tables, which is set to 32 TB.

### 19. What are the main operators in PostgreSQL?

The main types of operators available in PostgreSQL are:

- Arithmetic operators
- Logical operators
- Comparison operators
- Bitwise operators

### 20. What is an index in PostgreSQL?

An **index** in PostgreSQL is a database object that ~={green}improves the speed of data retrieval operations=~ on a table.

It works by creating a data structure that ~={cyan}organizes and sorts the values of one or more columns=~, allowing for faster searching, filtering, and sorting of records.

An index is created ~={magenta}for specific columns=~, and it contains a subset of the data from those columns along with pointers to the actual rows in the table.
 - Values from the columns + Pointer to the actual rows in the table.

***How does it work?***

1. Index created
2. PostgreSQL builds a sorted data structure (often a B-tree or other data structures like hash, GIN, or GiST) that contains the indexed column values along with pointers to the corresponding rows in the table.
3. When a query is executed that involves searching for a value in the indexed column, PostgreSQL can use the index to quickly find the location of the desired rows rather than scanning the entire table.

***Types of indexes:***

- **B-tree Index**: The default index type, suitable for most types of queries.
- **Hash Index**: Optimized for equality comparisons.
- **GIN (Generalized Inverted Index)**: Effective for indexing array, JSONB, and full-text search data.
- **GiST (Generalized Search Tree)**: Used for complex data types, such as geometric data.
- **BRIN (Block Range INdex)**: Useful for very large tables where data is naturally ordered.

***Creating an index:***
Using the `CREATE INDEX` command:

```sql
CREATE INDEX idx_users_username ON users (username)
```

This creates an index named `idx_users_username` on the `username` column of the `users` table.

***Performance Trade-offs:***
While indexes significantly speed up read operations (SELECT queries), they come with some trade-offs:

- **Storage Space**: Indexes consume additional disk space.
- **Write Performance**: Every time a row is inserted, updated, or deleted, the index must also be updated, which can slow down write operations.

### 21. What is partitioning in PostgreSQL?

It’s the process of splitting a large table into smaller pieces. It can be done through several methods:

- *Range partitioning*
 	- Data is divided into partitions based on a range of values in a specified column (sales by year, employees per salary...)

```sql
CREATE TABLE sales (
 id SERIAL PRIMARY KEY,
 sale_date DATE,
 amount NUMERIC
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2022 PARTITION OF sales FOR VALUES FROM ('2022-01-01') TO ('2022-12-31');
CREATE TABLE sales_2023 PARTITION OF sales FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');
```

- *List partitioning*
 	- Based on a predefined list of values (geographical regions).

```sql
CREATE TABLE customers (
 id SERIAL PRIMARY KEY,
 region VARCHAR(50)
) PARTITION BY LIST (region);

CREATE TABLE customers_us PARTITION OF customers FOR VALUES IN ('US', 'Canada');
CREATE TABLE customers_eu PARTITION OF customers FOR VALUES IN ('UK', 'Germany', 'France');
```

- *Hash partitioning*
 	- Based on a hash function applied to a column’s values.

```sql
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(50)
) PARTITION BY HASH (id);

CREATE TABLE users_p0 PARTITION OF users FOR VALUES WITH (MODULUS 4, REMAINDER 0); 
CREATE TABLE users_p1 PARTITION OF users FOR VALUES WITH (MODULUS 4, REMAINDER 1); 
CREATE TABLE users_p2 PARTITION OF users FOR VALUES WITH (MODULUS 4, REMAINDER 2); 
CREATE TABLE users_p3 PARTITION OF users FOR VALUES WITH (MODULUS 4, REMAINDER 3);
```

### 22. What are the 4 main properties of a transaction in PostgreSQL? Which acronym is used to refer to them?

Transactions in PostgreSQL are expected to be atomic, consistent, isolated, and durable. These properties are commonly referred to by the acronym, ACID.

### 23. What is Write-Ahead Logging in PostgreSQL?

**Write-Ahead Logging (WAL)** in PostgreSQL is a technique used to ensure data integrity and reliability by logging changes before they are applied to the actual database.
 This ensures that in the event of a crash or unexpected shutdown, PostgreSQL can use the log to restore the database to a consistent state.

### 24. What types of joins are available in PostgreSQL?

In PostgreSQL, the main joins are:

- **INNER JOIN:** Returns records that have matching values in both tables
- **LEFT JOIN:** Returns all records from the left table, and the matched records from the right table
- **RIGHT JOIN:** Returns all records from the right table, and the matched records from the left table
- **FULL JOIN:** Returns all records when there is a match in either left or right table

### 25. What is a function in PostgreSQL?

A **function** in PostgreSQL, often referred to as a **stored procedure**, is a database object that encapsulates a series of SQL operations and logic into a single reusable block.
 - Complex operations
 - Return results
 - Help streamline repeated tasks by encapsulating them within a callable procedure
 - Error handling

*Example:*

```sql
CREATE OR REPLACE FUNCTION calculate_discount(price NUMERIC, discount_percent NUMERIC) 
RETURNS NUMERIC AS $$ 
BEGIN 
 RETURN price - (price * discount_percent / 100); 
END; $$ LANGUAGE plpgsql;
```

### 26. What is a view in PostgreSQL?

- A **view** in PostgreSQL is a virtual table that represents the result of a query.
- It doesn’t store data itself but instead displays data from one or more underlying tables based on a predefined query.
- Views are useful for simplifying complex queries, enhancing security, and providing a layer of abstraction for data access.

*Example:*

```sql
CREATE VIEW available_products AS
SELECT product_id, product_name, price
FROM products
WHERE in_stock = true;
```

Now, whenever you need to see the list of available products, you can query the `available_products` view like this:

```sql
SELECT * FROM available_products;
```

***Types of Views:***

1. **Simple Views**:
    - Based on a single table with straightforward queries.
2. **Complex Views**:
    - Based on multiple tables, often involving joins, aggregates, or other advanced SQL operations.
3. **Materialized Views**:
    - A special type of view that physically stores the result of the query.
    - Materialized views improve performance for frequently queried data but require maintenance to stay up-to-date.
