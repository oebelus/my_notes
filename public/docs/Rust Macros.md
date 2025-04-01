Macros is a way to write code that writes another code, or metaprogramming. It's useful to reduce the amount of boilerplate code (same as functions).

Some differences between macros and functions (from the Rust book):

|               | Macros                                                                                                                         | Functions                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| *Compilation* | Expanded during compile-time (can implement a trait on a given type).                                                          | Expanded during run-time (trait needs to be implemented at compile time). |
| *Parameters*  | Can take a variable number of parameters - We can call `println!("hello")` with one argument or `println!("hello {}", name)` - | Must declare the number and type of parameters the function has.          |
| *Complexity*  | Complex, difficult to read, understand, and maintain.                                                                          | They are Ezpz.                                                            |
| *Scoping*     | Macros should be defined or called them into scope before being called in a file.                                              | Can be defined anywhere and called anywhere.                              |

>C macros are text substitution, while Rust macros are applied to the token tree.
>
### The types of macros

We distinguish between declarative macros and procedural macros.

#### Declarative macros

The most widely used, referred to as "macros by example", “`macro_rules!` macros,” or just plain “macros.”

Enable you to write something similar to a match expression that operates on the Rust code you provide as arguments.

>One of the common declarative macro is `println!`

```Rust
macro_rules! add{
 // First arm matches add!(1,2), add!(2,3)...
    ($a:expr,$b:expr)=>{
        {
            $a+$b
        }
    };

 // Second arm matches add!(1), add!(2) etc
    $a:expr)=>{
        {
            $a
        }
    }
}

fn main(){
 // call to macro, $a=1 and $b=2
 add!(1,2);
}
```

Each branch can take multiple arguments, starting with the `$` sign and followed by a token type:

- `item` — an item, like a function, struct, module, etc.
- `block` — a block (i.e. a block of statements and/or an expression, surrounded by braces)
- `stmt` — a statement
- `pat` — a pattern
- `expr` — an expression
- `ty` — a type
- `ident` — an identifier
- `path` — a path (e.g., `foo`, `::std::mem::replace`, `transmute::<_, int>`, …)
- `meta` — a meta item; the things that go inside `#[...]` and `#![...]` attributes
- `tt` — a single token tree
- `vis` — a possibly empty `Visibility` qualifier

#### Procedural macros

This allows you to operate on the AST of the Rust code. A procedural macro is a function from a `TokenStream` to another `TokenStream`, where the output replaces the macro invocation.

```Rust
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();
}
```

We’ve introduced three new crates: `proc_macro`, [`syn`](https://crates.io/crates/syn), and [`quote`](https://crates.io/crates/quote):

- The `proc_macro` crate comes with Rust, so we didn’t need to add that to the dependencies in `Cargo.toml`: it's the the compiler’s API that allows us to read and manipulate Rust code from our code.
- The `syn` crate parses Rust code from a string into a data structure that we can perform operations on.
- The `quote` crate turns `syn` data structures back into Rust code.
