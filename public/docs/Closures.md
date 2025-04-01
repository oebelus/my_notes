Closures can capture values from their environment in three ways:

- borrowing immutably;
- borrowing mutably;
- taking ownership.

The way a closure captures and handles values from the environment affects which traits the closure implements, and traits are how functions and structs can specify what kinds of closures they can use.

Closures will automatically implement one, two, or all three of these `Fn` traits, in an additive fashion, depending on how the closure’s body handles the values:

- `FnOnce`:
 	- closures that can be called once -> all closures implement at least this trait, because all closures can be called.
 	- *Example:* A closure that moves captured values out of its body will only implement `FnOnce` and none of the other `Fn` traits, because it can only be called once.
 	- => A closure that takes ownership of its captured variables, consuming them in the process.
- `FnMut`:
 	- closures that don’t move captured values out of their body;
 	- closures that might mutate the captured values;
 	- closures can be called more than once.
 	- => A closure that mutably borrows its environment, allowing it to modify variables.
- `Fn`:
 	- closures that don’t move captured values out of their body;
 	- closures that don’t mutate captured values;
 	- closures that capture nothing from their environment.
 	- => A closure that borrows its environment immutably. It is useful for read-only operations.
