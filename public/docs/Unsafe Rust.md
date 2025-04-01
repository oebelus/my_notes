The `unsafe` keyword give you the ability to do these things:

##### 1. Dereferencing a raw pointer

Unsafe Rust has two types of raw pointers:

- Immutable raw pointer.

```rust
let r1 = &num as *const i32;
```

- Mutable raw pointer.

```rust
let r1 = &mut num as *mut i32;
```

>The `*` isn't a dereference pointer, it's just how we define raw pointers.

Here are some raw pointers facts:

- They are allowed to ignore the borrowing rules by having mutable and immutable pointers, or multiple mutable pointers to the same address.
- They are not guaranteed to point to valid memory addresses.
- They can be `null`.
- They don't implement any type of automatic cleanup.
- We can't dereference raw pointers unless they are inside an `unsafe` block.

Let's dereference some pointers:

```rust
unsafe {
 println!("{}", *r1);
 println!("{}", *r2);
}
```

>Without the `unsafe` keyword, you get the error message: `dereference of raw pointer is unsafe and requires unsafe function or block`.

These variables are created from the same variable `num`, and thus, they point to the same memory address.

Dereferencing raw pointers is unsafe because there are no guarantees about the validity or exclusivity of the memory they point to, which could result in undefined behavior.

##### 2. Calling an unsafe method or function

Unsafe functions look the same as normal functions, except that they are preceded by the `unsafe` keyword. This means that if incorrect arguments are provided to the function, undefined behavior could occur.

```rust
unsafe fn dangerous() {}

unsafe {
 dangerous();
}
```

##### 3. Creating a safe abstraction

*Example:*

```rust
let mut slice = &mut vec![1, 2, 3, 4, 5, 6];

let len = slice.len();
let mid = len / 2;

let (a, b) = (&mut slice[..mid], &mut slice[mid..]);
```

If we compile this code, we get `cannot borrow slice as mutable more than once at a time`, so the borrow checker can't understand that we are borrowing  different parts of the slice (this code is fine btw).

What's the solution then? `unsafe` blocks! Let's try it out:

```rust
let slice = &mut vec![1, 2, 3, 4, 5, 6];
let ptr = slice.as_mut_ptr();

let len = slice.len();
let mid = len / 2;

unsafe {
 let (a, b) = (
  slice::from_raw_parts_mut(ptr, mid),
  slice::from_raw_parts_mut(ptr.add(mid), len - mid),
 );
 println!("{} {}", a.len(), b.len());
}
```

`from_raw_parts_mut` and `add` are unsafe functions because we must insure that the pointers passed to them is valid, which motivates the use of an `unsafe` block.

##### 4. Extern Functions to Call External Code

Rust code might want to interact with code from a different language. For this purpose, Rust has the `extern` keyword which facilitates the creation and the use of  a foreign function interface (FFI).

>A **foreign function interface** (**FFI**) is a mechanism by which a program written in one programming language can call routines or make use of services written or compiled in another one.

Calling a function defined within an extern block is always unsafe because we don't know if the language we're calling into have the same rules and guarantees as Rust.

```rust
extern "C" {
 fn abs(input: i32) -> i32;
}

fn main() {
 unsafe {
  println!("Absolute value of -3 according to C: {}", abs(-3));
 }
}

#[no-mangle]
pub extern "C" fn call_from_c() {
 println!("Just called a Rust function from C!");
}
```

We also have to add `no-mangle` annotation to let the Rust compiler know not to mangle the name of the function.

>Mangling is when the compiler changes the name of a function to give it more information for other parts of the compilation process.
>
##### 5. Accessing and Modifying Mutable Static Variables

In Rust, global variables are called static variables.

Some rules about static variables:

- SCREAMING_SNAKE_CASE;
- Must define a type;
- Must have a static lifetime;

The differences between immutable static variables and constants:

- Static variables have a fixed address in memory, constants are allowed to duplicate their data whenever they are used.
- Static variables can be mutable but accessing and modifying them is unsafe.

```rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
 unsafe {
  COUNTER += inc;
 }
}
```

##### 6. Implement an `unsafe` trait

A trait is unsafe when at least one of its methods is unsafe.

```rust
unsafe trait Foo {
 // methods
}

unsafe impl Foo for i32 {
 // method implementation
}
```

##### 7. Access fields of unions

A **union** is a data type that allows a single memory location to store values of different types at different times.

A union is similar to a struct, the difference is:

- A struct can store multiple fields, all of which are accessible simultaneously
- A union can only hold data in one of its fields at a time, i.e. at any given moment, only one of the fields in a union is valid.

|                   | **Struct**                          | **Union**                          |
| ----------------- | ----------------------------------- | ---------------------------------- |
| **Memory**        | Each field has its own memory.      | All fields share the same memory.  |
| **Fields Access** | All fields can be accessed anytime. | Only one field is valid at a time. |
| **Safety**        | Safe to use.                        | Unsafe to access fields directly.  |
| **Use Case**      | General-purpose data structures.    | Low-level memory manipulation.     |
Unions are primarily used to

- Interface with C unions
- Very low-level programming scenarios where you need to manage memory manually and efficiently - Low-level bit manipulation tasks -.
- Optimizing memory for mutually exclusive data.

It's unsafe to access fields of a union because Rust can't guarantee the type of data stored in the union for a given instance.

```rust
#[repr(C)] // Ensures C-compatible memory layout
union MyUnion {
    int_value: i32,
    float_value: f32,
}

fn main() {
    let my_union = MyUnion { int_value: 42 }; 
    
    unsafe {
     // Valid access
        println!("int_value: {}", my_union.int_value);
        
        // Potentially undefined behavior
        println!("float_value: {}", my_union.float_value); 
    }
}
```

If I try to define both fields, I get `union expressions should have exactly one field`.

```rust
// This is not allowed
let my_union = MyUnion {
 int_value: 42,
 float_value: 3.14,
};
```
