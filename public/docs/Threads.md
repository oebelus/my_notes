#### Shared State Concurrency

To create shared state concurrency, I must follow these steps:

1. Define the shared data:
 - This is done using `Arc` (atomic reference counting) for safe ownership sharing, and `Mutex` for locking and protecting the shared data.
  - `Arc` allows multiple threads to own the data;
  - `Mutex` ensures that only one thread can access the data at a time (It locks the thread).

```rust
let counter = Arc::new(Mutex::new(0));
```

2. Clone the shared state for each thread:
 - Each thread must have a reference to the shared state.
 - `Arc::clone` creates a new reference to the `Arc`-wrapped data without duplicating the underlying data.

```rust
let counter = Arc::clone(&counter);
```

3. Spawn threads:
 - Use `std::thread::spawn` to create threads.
 - Pass the cloned reference of the shared state to each thread.

```rust
std::thread::spawn(move || {
    // Thread logic goes here
});
```

4. Lock and modify the shared state:
 - Using `.lock()` returns a `MutexGuard` that allows mutable access to the shared data.

```rust
let mut counter = counter.lock().unwrap();
*counter += increments as i32;
```

5. Collect thread handles:
 - Store the `JoinHandle` returned by `std::thread::spawn` to manage thread lifecycle.

```rust
let mut spawned: Vec<JoinHandle<()>> = vec![];
spawned.push(thread_handle);
```

6. Join Threads:
 - Ensure all threads complete execution by calling `.join()` on each `JoinHandle`.
 - This blocks the main thread until the spawned threads finish their tasks.

```rust
for handle in spawned {
    handle.join().unwrap();
}
```

The full code:

```Rust
pub fn increment_counter(
    counter: Arc<Mutex<i32>>,
    threads: usize,
    increments: usize,
) -> Vec<JoinHandle<()>> {
    let mut spawned = vec![];

    for _ in 0..threads {
        let counter = Arc::clone(&counter);
        spawned.push(std::thread::spawn(move || {
            let mut counter = counter.lock().unwrap();
            *counter += increments as i32;
        }));
    }

    spawned
}
```
