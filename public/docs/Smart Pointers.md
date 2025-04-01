# Boxes

Just like C, we have memory allocation to the heap in Rust. The difference is that in C, you write explicit calls to `malloc` (and then `free`). In Rust, heap allocation is handled by [`Box`](https://doc.rust-lang.org/std/boxed/struct.Box.html).

Box is a struct that takes a value, allocates space for it on the heap using `malloc`, and then automatically frees it when it goes out of scope.

```rust
fn main() {
 let x: Box<i32> = Box::new(2);
 // x allocated
 
 println!("{}", x);
}
// x freed 
```

##### The `Deref` Trait

An implementation of `Deref`:

```rust
impl<T> Deref for A<T> {
 type Target = T;

 fn deref(&self) -> &Self::Target {
  &self.0
 }
}
```

##### `Deref` Coercion

Let's talk about implicit `deref` coercion with functions and methods. It's a method for types that implement the `deref` trait, it will automatically convert a reference of one type to a reference to another type.

```rust
fn main() {
 let m = Box::new(String::from("hello"));
 hello(&m);
}

fn hello(name: &str) {
 println!("Hello, {}!", name);
}
```

The code above works even if `m` is of type `Box` and the `hello` method is expecting a string slice, `&Box<String> -> &String -> &str`. If there wasn't any `deref` coercion, we would call the function like this:

```rust
hello(&(*m)[..])
```

So, Rust dies `deref` coercion when it finds types and trait implementations in three cases:

- From `&T` to `&U` when `T: Deref<Target=U>`;
- From `&mut T` to `&mut U` when `T: DerefMut<Target=U>`;
- From `&mut T` to `&U` when `T: Deref<Target=U>`;

>It can't perform `deref` coercion when going from an immutable reference to a mutable reference.
>
##### The `Drop` Trait

It can be implemented on any type and allows you to customize the becoming of a value when it goes out of scope. The structs that implement the `Drop` trait get their memory freed automatically when values go out of scope.

##### Box Implementation

An implementation of `Box` found [here](https://stanford-cs242.github.io/f18/lectures/06-1-smart-pointers.html):

```rust
use std::alloc::{alloc, Layout};
use std::{ptr, mem};

struct Box<T> {
  value: *mut T
}

impl<T> Box<T> {
  fn new(t: T) -> Box<T> {
    let value = unsafe {
      let typesize = mem::size_of::<T>();
      let layout = Layout::from_size_align(typesize, typesize).unwrap();
      let mut value = alloc(layout) as *mut T;
      ptr::copy(&t as *const T, value, typesize);
      value
    };
    mem::forget(t);
    Box { value }
  }
}
```

Trying to understand this, Box is a wrapper around a raw mutable pointer to an arbitrary type `T`.

When implementing the `Box`:

1. We get the size of the type `T` (determined with `mem::size_of::<T>()`)
2. We create a `Layout` based on the `size` and `align` of `T`.
3. We allocate the raw memory using the layout.
4. We copy the value of `t` of size `typesize` into the allocated memory (`value`) with `ptr::copy`.
5. We prevent `t` from being deallocated when it goes out of scope with `mem::forget(t)` "don’t try to call destructors on `t`, just forget about it.".
6. We return the `Box`.

>The third argument of `ptr::copy` is the number of elements of type `T` that will be copied from the source (`src`) to the destination (`dst`).

The `Layout` struct:

```rust
pub struct Layout { /* private fields */ }

pub const fn from_size_align(
 size: usize,
 align: usize,
) -> Result<Layout, LayoutError>
```

The _size_ of a value is the offset in bytes between successive elements in an array with that item type including alignment padding.

- The size of a value is always a multiple of its alignment.
- Some types are 0-sized (0 is a multiple of any alignment).

The _alignment_ of a value specifies what addresses are valid to store the value at. A value of alignment `n` must only be stored at an address that is a multiple of n.

- _Example:_ a value with an alignment of 2 must be stored at an even address.

More information [here](https://doc.rust-lang.org/reference/type-layout.html).

_A small illustration:_

-> For this struct:

```rust
struct Mixed {
    x: u8,   // 1 byte
    y: u32,  // 8 bytes
    z: u16,  // 2 bytes
}
```

```
Field         Size  Alignment  Memory Layout (Bytes)
-----------------------------------------------------
a: u8          1       1      [aa] [--] [--] [--]
b: u32         4       4      [bb] [bb] [bb] [bb]
c: u16         2       2      [cc] [cc] [--] [--]
-----------------------------------------------------
Total Size:   12 bytes (including padding)
```

The total size of a struct is often padded to be a multiple of the largest alignment requirement of any field in the struct.

By reordering fields, we can reduce padding:

```rust
struct Example {
    x: u8,   // 1 byte
    y: u32,  // 4 bytes
    z: u16,  // 2 bytes
}
```

```
Field         Size  Alignment  Memory Layout (Bytes)
-----------------------------------------------------
b: u32         4       4      [bb] [bb] [bb] [bb]
c: u16         2       2      [cc] [cc]
a: u8          1       1      [aa] [--]
-----------------------------------------------------
Total Size:    8 bytes (including padding)
```

# Reference Cell

The difference between `RefCell` and `Box` is that the former enforces borrowing rules at run-time (dynamically checked borrow rules) and the latter at compile-time.

We use the `RefCell` when we are sure that the code is following the rules but the compiler can't understand that, in single-threaded programs.

#### Features

- _Interior Mutability:_
 	- `RefCell` allows mutating its contents even when the `RefCell` itself is immutable.
 	- _Methods:_
  		- `.borrow_mut()` method is used for mutable borrowing.
  		- `.borrow()` is used for immutable borrowing.
- _Shared ownership with `Rc`:_
 	- `Rc` is used to enable shared ownership of the data.
 	- Data wrapped in a `RefCell` enables mutation.
- _Dynamic Borrow Checking:_
 	- `RefCell` ensures there is no violation of Rust's borrowing rules -> If you attempt an invalid borrow, it will panic.

>This pattern works only in single-threaded contexts. For multi-threaded scenarios, this is used: `Arc<Mutex<T>>`

# Reference Counting

One limitation of ownership is that when we have multiple references to a particular value, the references cannot outlive the owner.

A reference count is a track of how many variables have access to a particular value, and we destruct the value when the count reaches 0. Rust has this pointer type called [`Rc`](https://doc.rust-lang.org/std/rc/struct.Rc.html).

```rust
fn make_rc() -> Rc<String> {
  let s1: Rc<String> = Rc::new(String::from("Hello"));
  let s2: Rc<String> = s1.clone(); // increment refcount, don't actually copy the string
  s2
  // decrement refcount when s1 dies
}

fn main() {
  let s2 = make_rc();
  // decrement refcount when s dies, and destroy the string
}
```

`s1` and `s2` should refer to the _same string_ in memory, but even though `s1` created it originally, the string only disappears once the last referent, `s2`, expires.

>The `Rc` is only useful in single-threaded programs.
