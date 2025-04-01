## Basics of MongoDB

#### What is MongoDB?

It's a NoSQL database that stores data in documents (JSON-like) formats instead of traditional rows and columns.

#### What is the difference with relational databases?

- Schema-less: MongoDB allows flexible document structures, while relational databases require predefined schemas.
- Scalability: MongoDB supports horizontal scaling using sharding, whereas relational databases typically scale vertically.
- Query Language: MongoDB uses a document-based query language, while relational databases use SQL.
- Data Relationships: Relational databases use joins; MongoDB handles relationships through embedded or referenced documents.

#### What is the document-based query language?

It's the way you interact with data in MongoDB using queries written in JavaScript-like syntax, which operates directly on **documents** (BSON objects).

- Querying documents:

```javascript
db.users.find({ name: "Alice" });
```

- Operators:

```javascript
db.users.find({ age: { $gt: 30 } }); // Find users older than 30
```

- Projections (fields to include or exclude):

```javascript
db.users.find({ name: "Alice" }, { age: 1, name: 1 });
```

- Aggregations (advanced querying, such as filtering, grouping, sorting and transforming data)

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);
```

- Document structure: The queries operate on documents, so data can be deeply nested, and MongoDB's query language provides syntax to match and extract data from these nested structures.

```javascript
db.users.find({ "address.city": "New York" });
```

#### Explain the document-oriented data model used in MongoDB

MongoDB stores data as documents, which are JSON-like objects called BSON. A document contains fields (key-value pairs) that can store various types of data (strings, numbers, arrays, nested objects...)

```json
{
  "_id": "12345",
  "name": "Alice",
  "age": 30,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "traveling"]
}
```

#### What are collections and documents in MongoDB?

- Collections: a group of related documents, similar to a table in a relational database. Collections don’t enforce a schema.
 	- Example: `User` collection.
- Document: A single record in a collection, represented as a JSON-like object (BSON). Each document in a collection can have a different structure.
 	- Example: `User` collection has many users (document).

#### What is a schema?

In MongoDB, a **schema** defines the structure of the documents in a collection. While MongoDB is schema-less by default -documents within a collection can have different fields-, you can still define a schema using tools like **Mongoose** in Node.js to enforce certain rules and validations for consistency.

```javascript
import mongoose, { Schema, Document } from 'mongoose';

// Define the type of user 
interface User extends Document = { 
 name: string; 
 age: number; 
 address: {
  city: string; 
  zip: string;
 };
 hobbies: string[] 
}

// Define the structure of the document (schema)
const userSchema = new Schema({
 name: { type: String, required: true },
 age: { type: Number, required: true },
 address: { 
  city: { type: String }, 
  zip: { type: String } 
 },
 hobbies: [{ type: String }]
})

// Create a model based on the schema
const User = mongoose.model<User>('User', userSchema);

export default UserModel;
```

#### How does MongoDB ensure high availability and scalability?

###### High Availability

Achieved through <span style="color:yellow">Replica Sets</span>. A replica set is a group of MongoDB servers (nodes) that maintain the same data set. One node is the **primary**, and the others are **secondaries**.

- **Primary Node**: The primary node handles all read and write operations. If the primary fails, MongoDB automatically promotes one of the secondary nodes to become the new primary.
- **Secondary Nodes**: These nodes replicate data from the primary node and can serve read queries (if configured to do so).

*Examples:*

1. Start the replica set with multiple MongoDB instances (let's say `node1`, `node2`, and `node3`).

```bash
mongod --replSet "rs0" --port 27017 --dbpath /data/db1
mongod --replSet "rs0" --port 27018 --dbpath /data/db2
mongod --replSet "rs0" --port 27019 --dbpath /data/db3
```

2. Initialize the replica set:

```bash
mongo --port 27017
rs.initiate()
```

3. Check the status of the replica set:

```
rs.status()
```

If the primary node fails, one of the secondary nodes will automatically be promoted to primary, ensuring high availability.

###### Scalability

<span style="color:yellow">Sharding</span> is a method of distributing data across multiple servers (shards) to achieve **horizontal scaling**. In sharding, data is divided into chunks, and each chunk is distributed across different shards based on a shard key.

- **Shard Key**: The field in the document that MongoDB uses to partition the data across the shards.
- **Shard**: A MongoDB server or replica set responsible for storing a portion of the data.
- **Config Servers**: Store metadata about the sharded cluster (information about which shard contains which chunk).
- **Mongos**: Acts as a routing service for client requests, directing them to the appropriate shard.

*Example of sharding setup:*

1. Enable Sharding for a Database:

```bash
mongo --host <config-server-host> --port 27019
sh.enableSharding("myDatabase")
```

2. Choose a Shard Key (for example, `userId`):

```bash
sh.shardCollection("myDatabase.users", { "userId": 1 })
```

3. Add shards to the cluster:

```bash
sh.addShard("rs0/host1:27017")
sh.addShard("rs1/host2:27017")
sh.addShard("rs2/host3:27017")
```

4. Querying Sharded Data: When you query the sharded collection, the `mongos` router directs the query to the appropriate shard based on the shard key. For example:

```bash
db.users.find({ userId: 123 })
```

#### What are the advantages and disadvantages of using MongoDB?

- **Advantages**:
  - Flexible schema for dynamic or unstructured data.
  - High scalability via sharding.
  - JSON-like documents for intuitive data modeling.
  - Rich query language with aggregation capabilities.
  - Support for ACID transactions in modern versions.
- **Disadvantages**:
  - Higher memory usage due to BSON format.
  - Limited support for complex joins compared to relational databases.
  - Requires careful planning for sharding and indexing to prevent performance issues.

#### Explain the concept of replication in MongoDB. What is a replica set?

**Replication**: Duplicates data across multiple servers to ensure availability and fault tolerance.

- **Replica Set**: A group of MongoDB servers (nodes) where:
 	- One node acts as a primary node (handles write operations)
 	- Other nodes are secondaries (replicate data from the primary and handle read requests if configured).
 	- If the primary fails, an election occurs, and a secondary becomes the new primary.

#### What is sharding, and why is it used in MongoDB?

**Sharding**: A method of distributing data across multiple servers (shards).

- **Why Use Sharding?**:
  - To handle large datasets that cannot fit on a single server.
  - To distribute query loads across multiple servers for better performance.
- MongoDB uses a **shard key** to determine how data is partitioned.

#### How does MongoDB handle transactions and ACID compliance?

MongoDB supports multi-document **ACID transactions** starting from version 4.0. Transactions allow you to execute multiple operations as a single, atomic unit.

```javascript
const session = await client.startSession();
session.startTransaction();
try {
 await collection1.insertOne({ name: "Alice" }, { session });
 await collection2.updateOne({ name: "Bob" }, { $set: { age: 25 } }, { session });
 await session.commitTransaction();
} catch (error) {
 await session.abortTransaction();
} finally {
 session.endSession();
}
```

#### What is the difference between `findOne` and `find` in MongoDB?

- **`findOne`**: Retrieves the first document matching the query criteria.
- **`find`**: Returns a cursor that iterates over all documents matching the query criteria.

#### What is a cursor in MongoDB?

A cursor is an object that allows you to iterate over the results of a query.

When you run a query (e.g., using the `find()` method), MongoDB doesn't return the results all at once. Instead, it returns a **cursor** that points to the documents that match the query, and you can use this cursor to retrieve the documents one by one.

```javascript
// Assume we have a 'users' collection in the database
const cursor = db.users.find({ age: { $gte: 18 } });

// Iterating over the cursor
cursor.forEach(doc => {
  console.log(doc.name);
});
```

#### Explain the concept of indexes in MongoDB. How do they improve query performance?

**Indexes**: Special data structures that store a small portion of the dataset in an easy-to-search format.

When MongoDB creates an index on a field, it organizes the data in a special data structure (like a **B-tree**) that allows MongoDB to find the documents much faster than scanning every document in the collection.

They improve query performance by reducing the number of documents scanned.

```javascript
// Create an index on the 'age' field
collection.createIndex({ age: 1 });
```

Without an index, MongoDB performs a **collection scan**, which can be slow for large datasets.

#### What are capped collections in MongoDB?

Fixed-size collections that automatically overwrite the oldest data when the size limit is reached. They are useful for logging and caching.

```js
db.createCollection("logs", { 
 capped: true, 
 size: 5242880, 
 max: 5000 
});
```

#### Describe the difference between `embedded documents` and `referenced documents`

**Embedded Documents**: Store related data within a single document. Best for one-to-few relationships.

```json
{
  "name": "Alice",
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}
```

**Referenced Documents**: Use references (`ObjectId`-s) to link documents. Best for one-to-many or many-to-many relationships.

```json
{
  "name": "Alice",
  "address_id": "60d5f9f9a1b2f4c3a4e5d6g7"
}
```

#### How do you perform aggregation in MongoDB

Aggregation is performed using the **aggregation pipeline**, a series of stages to process and transform data.

```js
collection.aggregate([
  { $match: { age: { $gte: 30 } } },
  { $group: { _id: "$city", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

#### Explain the purpose of `$lookup` in MongoDB’s aggregation pipeline

The `$lookup` operator in MongoDB allows you to **combine documents from two collections** into a single result set, much like performing a **join** operation in relational databases (left outer join).

```js
collection.aggregate([
  {
    $lookup: {
      from: "orders",        // The collection to join
      localField: "userId",  // The field from the left collection
      foreignField: "_id",   // The field from the right collection
      as: "orderDetails"     // The name of the new array field
    }
  }
]);
```

A left outer join means that for each document in the "left" collection (the collection from which you are running the query), MongoDB will look for matching documents in the "right" collection (the collection you're looking up).

If no match is found, the left collection’s document is still included in the result, but with a `null` value for the data from the right collection.

## Advanced MongoDB

#### How does MongoDB handle schema validation?

Starting from MongoDB 3.6, you can define validation rules for collections using the `validation` option in the `create` or `collMod` command.

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "int", minimum: 18 },
      },
    },
  },
});
```

#### What is the role of `ObjectId` in MongoDB? How is it generated?

`ObjectId` is a special identifier used by MongoDB to uniquely identify documents within a collection. It is 12 bytes long and consists of:

- **4 bytes** representing the timestamp of creation (seconds since Unix epoch).
- **5 bytes** representing a random value, unique to the machine and process.
- **3 bytes** representing an incrementing counter (to ensure uniqueness in a single machine, even with multiple documents created within the same second).

MongoDB generates `ObjectId` automatically for the `_id` field if one is not provided. You can also generate it manually using the `ObjectId()` function.

```js
const ObjectId = new require('mongodb').ObjectId();
console.log(ObjectId()); // Generates a new ObjectId
```

#### What is `GridFS` in MongoDB, and when would you use it?

**GridFS** is a specification for storing and retrieving large files (larger than 16MB, the maximum document size in MongoDB) in MongoDB. It divides files into smaller chunks (by default, 255KB each) and stores them in two collections:

- `fs.files`: stores metadata about the file.
- `fs.chunks`: stores the actual data chunks.

```js
const { MongoClient, GridFSBucket } = require("mongodb");

async function uploadFile() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("test");
  const bucket = new GridFSBucket(db);

  const uploadStream = bucket.openUploadStream("largefile.txt");
  const fs = require('fs');
  const fileStream = fs.createReadStream('path/to/largefile.txt');
  
  fileStream.pipe(uploadStream);
}
```

#### Explain the difference between `$set` and `$push` operators

**`$set`**: used to update the value of a field in a document. If the field does not exist, it will create it. It replaces the value of a field entirely.

```js
db.users.updateOne({ name: "Alice" }, { $set: { age: 30 } });
```

**`$push`**: used to add an element to an array field. If the field does not exist, MongoDB will create it as an array and push the value into it.

```js
db.users.updateOne({ name: "Alice" }, { $push: { hobbies: "reading" } });
```

#### Describe the difference between `upsert` and a normal update in MongoDB

`Update`: Performs an update if a matching document is found. If no document matches the query, no changes are made.

```js
db.users.updateOne({ name: "Alice" }, { $set: { age: 30 } });
```

`Upsert`: If no document matches the query, an `upsert` operation will **insert** a new document with the query and update the fields. It’s an **update or insert** operation.

```js
db.users.updateOne({ name: "Bob" }, { $set: { age: 25 } }, { upsert: true });
```

#### How do you use MongoDB's `$regex` operator? Provide an example

The `$regex` operator allows you to match strings using regular expressions in MongoDB.

```js
db.users.find({ name: { $regex: "^A" } });
```

#### What is the purpose of a TTL index in MongoDB?

A **TTL (Time-to-Live) index** is a special index in MongoDB that automatically removes documents after a specified period. It’s useful for managing data that only needs to be kept for a certain time, such as session data, cache entries, or logs.

```js
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

#### How does MongoDB handle large amounts of data?

- **Sharding**: Distributes data across multiple servers (shards) to balance the load and prevent performance bottlenecks.
- **Indexes**: Proper indexing (e.g., compound indexes, geospatial indexes) can significantly improve query performance.
- **Aggregation Pipelines**: Use aggregation pipelines to efficiently process and filter large datasets on the server side rather than in the application.
- **Compression**: MongoDB uses data compression techniques, like snappy compression, to reduce the storage footprint of large datasets.

#### How do you secure a MongoDB database? Discuss authentication and authorization strategies

MongoDB provides several methods for securing a database:

- **Authentication**: MongoDB supports various authentication mechanisms, such as:
  - **SCRAM (Salted Challenge Response Authentication Mechanism)** for username/password authentication.
  - **X.509 certificates** for client authentication.
  - **LDAP** integration for authentication.

- **Authorization**: MongoDB uses role-based access control (RBAC). Users are assigned roles that define the actions they can perform on the database, such as:
  - `read`: Can read data but not modify.
  - `readWrite`: Can read and modify data.
  - `dbAdmin`: Can perform administrative tasks on the database.

- **TLS/SSL**: Enable encryption in transit by using TLS/SSL to encrypt data between clients and servers.

- **Encryption at Rest**: MongoDB supports encrypting data stored on disk using **WiredTiger** storage engine with encryption options.
