### What is Node.js?

It's a JavaScript engine that provides the runtime environment to run JS code outside the browser.

### Key Features

- **Asynchronous & Non-Blocking**.
- **V8 Engine**.
- **Libuv Library**: Ensures consistent performance across platforms and assists in managing I/O operations.
- **NPM**: A vast package ecosystem simplifies module management and deployment.
- **Full-Stack JavaScript**: Allows for unified server and client-side code in JavaScript.

### Why Node.js?

- **Unified Language**: JavaScript both on the frontend and backend.
- **NPM Ecosystem**: The NPM repository offers a lot of open-source packages.
- **Scalability**: Cluster modules, load balancers, and Microservice Architecture aid in linear, on-demand scaling for both simple and intricate applications.
- **Real-Time Power**: With built-in WebSockets and event-based architecture, Node.js excels in constructing real-time applications such as multiplayer games, stock trading platforms, and chat applications.
- **Open Source**: Being an open-source technology, Node.js continuously benefits from community contributions, updates, and enhanced packages.

### What is the difference between JS and Node.js?

JS is a scripting language whereas Node.js is an engine that provides the runtime environment to run JS code.

### Is Node.js single-threaded?

Yes, it's single-threaded by default. However, it utilizes event-driven architecture and non-blocking operations to handle multiple concurrent requests efficiently, enabling scalability and high performance in applications.

### What kind of API function is supported by Node.js?

Synchronous and asynchronous.

### What is the difference between Synchronous and Asynchronous functions?

The synchronous functions:

- They block the execution until the synchronous task is complete.
- They execute tasks sequentially, each task must complete before moving to the next one.
- Returns the result immediately after completion.
- Errors can easily be caught with try-catch blocks.
- Suitable for simple sequential tasks with predictable execution flow.
 	- File reading
 	- Simple arithmetic operations

The asynchronous functions:

- They don't block the execution of the code. Tasks can be proceeded concurrently.
- Initiates tasks and proceeds with other operations while waiting for completion.
- It returns a promise, callback or uses event handling to handle the result upon completion.
- Error handling often involves callbacks, promises, or async/await syntax.
- Ideal for I/O-bound operations, network requests, and tasks requiring parallel processing.
 	- HTTP request
 	- Async file reading (`aiofiles`)
 	- Asynchronous sleep (`asyncio`) = simulating delay in a task

### What is a module in Node.js?

A block of reusable code that provides a simple or complex functionality that can communicate with external applications.

### What is `npm` and its advantages?

`npm` (Node Package Manager) is the default package manager for Node.js.

- Dependency management.
- Version control.
- Centralized repository.

### What is a middleware?

It's the function that works between the request and the response cycle. Middleware gets executed before the controller sends the response and after the server receives the request.

### How Does the Event Loop Work?

1. **Initialization**: When Node.js starts, it initializes the **event loop** to watch for I/O operations and other asynchronous tasks.
2. **Queueing**: Any task or I/O operation is added to a **queue**, which can be either the `microtask queue` or the `macrotask/Callback queue`.
3. **Polling**: The event loop iteratively checks for tasks in the queue while also **waiting** for I/O and timers.
4. **Execution Phases**: When the event loop detects tasks in the queue, it executes them in specific phases.

### What is JS event loop?

It ties to three concepts:

##### Call stack

- Provided by Javascript runtime (ex. V8).
- As a single threaded programming language, Javascript has only one call stack.
- LIFO.

##### Web APIs

APIs provided by the browser.

They kind of work as an artificial extra threads and allow us to execute multiple things at the same time for certain cases.

It's as WebAPIs helping the runtime by offering a extra threads for executing time consuming tasks so that the call stack doesn't get blocked.

##### Callback queue

Provided by the browser.

A queue where callback functions gets pushed from the WebAPIs once they have finished.

![event loop](https://i.ibb.co/s50r6XR/Javascript-Event-Loop-Web-APIs-1.png)

##### So what is event loop?

Provided by the browser.

is a mechanism that allows Node.js  to handle multiple asynchronous tasks concurrently within a single thread. It continuously listens for events and executes associated callback functions.

All it does is it constantly checks if there is anything in the call stack to execute and if not it will check if there is anything in the callback queue.

If there is something in callback queue, event loop will push it to call stack - but only if the call stack is empty!

### Event Loop Phases

- **Timers**: Manages timer events for scheduled tasks.
- **Pending callbacks**: Handles system events such as I/O, which are typically queued by the kernel.
- **Idle / prepare**: Ensures internal actions are managed before I/O events handling.
- **Poll**: Retrieves New I/O events.
- **Check**: Executes 'setImmediate' functions.
- **Close**: Handles close events, such as 'socket.close'.

### What is control flow in Node.js?

The sequence in which statements and functions are executed.

### What are the main disadvantages of Node.js?

- *Single-threaded nature:* May not fully utilize multi-core CPUs, limiting performance.
- *NoSQL preference:* Relational databases like MySQL aren’t commonly used.
- *Rapid API changes:* Frequent updates can introduce instability and compatibility issues.

### What is REPL in Node.js?

It stands for Read, Evaluate, Print, and Loop. It is an environment similar to the shell which is useful for debugging and writing code.

### What is `package.json` in Node.js?

`package.json` in Node.js is a metadata file that contains project-specific information such as dependencies, scripts, version, author details, and other configuration settings required for managing and building the project.

### Async/Await vs. Promises

- Promises:
 	- Promise is an object that represents the eventual completion (or failure) of an asynchronous operation.
 	- They consist of 3 states: resolved, rejected and pending.
 	- They provide methods like `.then()`, `.catch()`, and `.finally()` for handling success, errors, and cleanup.

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

- Async/Await:
 	- Built on promises.
 	- `async` functions always return a promise. Inside an `async` function, you use `await` to pause execution until a promise resolves.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

*Differences:*

- Readability:
 	- Promises can lead to "callback-like" chaining with multiple `.then()` calls.
 	- Async/await makes code easier to read and maintain, especially with complex flows.
- Error handling:
 	- Promises use `.catch()` for error handling.
 	- Async/await uses `try...catch` blocks, which integrate naturally into the language's control flow.
- Chaining:
 	- Promises involve explicit chaining to sequence operations, they don't pause the execution of the code inside the promise.
 	- Async/await implicitly handles sequencing by pausing execution until the awaited promise resolves.
- Usage:
 	- Promises work well in scenarios with simple flows or when concurrency or parallel execution is needed (e.g., `Promise.all`, `promise.race`).
 	- Async/await is preferred for complex logic and when readability is a priority.

### What are callbacks?

They are function that are passed as argument to another function in an asynchronous context, meant to be called after the task completion.

### What is callback hell?

It's when multiple callbacks create complex and deeply nested code often called the "pyramid of doom". It makes the code difficult to read, maintain and debug.

### What alternatives to callbacks help prevent callback hell?

Flattening the nesting by breaking down tasks, or switching to alternatives like Promises or async/await.

### Node.js global objects

Node.js Global Objects are the objects that are available in all modules without importing them.

- Console
- Buffer: provides a way of handling streams of binary data.

### How does Node.js handle child threads?

To manage these child threads, Node.js uses a combination of:

- A **thread pool**, powered by the libuv library.
- **Worker threads** for dedicated, offloaded computation.

### Describe the event-driven programming in Node.js

It uses an **event, listener,** and **emitter** architecture to handle asynchronous tasks.

- Event emitter: Acts as the event registry and dispatcher.
- Event handler (listener)

```js
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

emitter.on('event-name', (eventArgs) => {
    console.log(`Event-name was emitted with arguments: ${eventArgs}`);
});

emitter.emit('event-name', 'Some Payload');
```

### Key Distinctions between Node.js and traditional web server technologies

*Multi-threading (Traditional Servers) vs. Event Loop (Node.js):*

- **Traditional Servers**: Employ multi-threading. Each client request spawns a new thread, requiring resources even when idle.
- **Node.js**: Utilizes a single-thread with non-blocking, asynchronous functions for I/O tasks. This makes it exceptionally suitable for scenarios like real-time updates and microservices.

*Blocking vs. Non-blocking I/O*:

- **Traditional Servers**: Primarily rely on blocking I/O, meaning that the server waits for each I/O operation to finish before moving on to the next task.
- **Node.js**: Leverages non-blocking I/O, allowing the server to continue handling other tasks while waiting for I/O operations. Callbacks, Promises, and async/await support this approach.

*Language Consistency:*

- **Traditional Servers**: Often pair with languages like Java, C#, or PHP for server-side logic. Front-end developers might need to be proficient in both the server language and client-side technologies like JavaScript.
- **Node.js**: Employs JavaScript both client-side and server-side, fostering full-stack developer coherence and code reusability.

*Code execution:*

- **Traditional Servers**: Generally compile and execute code. Alterations might necessitate recompilation and possible downtime.
- **Node.js**: Facilitates a "write, save, and run" approach, without the need for recompilation.

*Deployment:*

- **Traditional Servers**: Often necessitate coordination with systems, database administrators, and IT teams for deployment.
- **Node.js**: Offers flexible, straightforward deployments. It's especially suited for cloud-native applications.

### Describe some of the core modules of Node.js

*Basic/System Control*

- **`os`**: Provides system-related utility functions. Example: `os.freemem()`, `os.totalmem()`.
- **`util`**: General utility functions primarily used for debugging. Example: `util.inspect()`.

*File System Handling*

- **`fs`**: Offers extensive file system capabilities. Commonly used methods include `fs.readFile()` and `fs.writeFile()`.

*Networking*

- **`http`/`https`**: Implements web server and client. Example: `http.createServer()`.
- **`net`**: Facilitates low-level networking tasks. Example: `net.createServer()`.
- **`dgram`**: Delivers UDP Datagram Socket support for messaging.

*Utility Modules*

- **`crypto`**: Encompasses cryptographic operations. Common methods include `crypto.createHash()` and `crypto.createHmac()`.
- **`zlib`**: Offers data compression capabilities integrated with various modules like `http`.
- **`stream`**: Facilitates event-based data stream processing.

*Others*

- **`path`**: Aids in file path string manipulation.
- **`url`**: Parses and formats URL strings, especially beneficial in web applications and server operations.

### How do you create a simple server in Node.js using the HTTP module?
