#### Variable shadowing

**Variable shadowing** occurs when a variable declared within a certain scope, has the same name as a variable declared in an outer scope.

- The new variable "shadows" the outer variable, making the original value inaccessible within that scope.

In SML:

```SML
val a = 10
val b = a * 2
val a = 5
val c = b
val d = a
val a = a + 1
```

The SML Shell:

```SML
val a = <hidden-value> : int
val b = 20 : int
val a = <hidden-value> : int
val c = 20 : int
val d = 5 : int
val a = a + 1
```

-> Shadowing can be potentially dangerous and make code much more difficult to read, especially in SML since there is no assignment operations => Meaning all variables are immutable once bound in a particular scope.

*Important Points:*

- Each `val` in SML introduces a new binding, rather than modifying an existing one. There's no reassignment, only new bindings.
  - Each `val a = ...` introduces a new, independent `a`, leaving the original values inaccessible from the current scope.

##### In JavaScript

```js
let a = 10;
{
  let a = 5;  // Shadows the outer `a`, but only within this block
  console.log(a);  // 5
}
console.log(a);  // 10, the outer `a` is unaffected
```

- **Reassignment**: `let` and `var` allow reassignment, so you can change `a`’s value after declaring it. However, `const` does not allow reassignment, though it does allow shadowing.
- **Shadowing**: If `a` is declared again inside a nested block scope, it creates a new binding that shadows the outer `a`. After the inner scope ends, the outer `a` remains intact.

>**Languages like JavaScript and Python** allow shadowing in nested blocks or functions, with reassignment allowed in the same scope.

##### In Rust

```rust
let a = 10;
let a = a * 2;  // Shadows the previous `a` with a new value
println!("{}", a);  // 20
```

- **Shadowing**: Rust’s shadowing is deliberate and common in functional patterns. Each `let` creates a new binding rather than mutating the variable, so it’s a controlled way to reuse variable names without true reassignment.
- **Reassignment**: To actually reassign, Rust requires the variable to be mutable (e.g., `let mut a = 10;`), which is distinct from shadowing.

>**Functional languages (like SML and Rust)** use shadowing as a way to create new bindings without reassigning, supporting immutability and safe programming practices.

##### There are different types of shadowing

Shadowing can be classified based on the scope where it occurs:

- *Block-Scoped shadowing:*
  - *Definition*: Occurs when a variable declared inside a block (like an `if` statement, `for` loop, or any code block) has the same name as a variable declared in an outer block or scope.
  - *Examples*: Languages with block-scoped variables, such as:
    - JavaScript (with `let` and `const`)
    - Rust, C++ (in newer standards)
  - *Behaviour*: The variable within the inner block shadows the outer variable only within that block, and the outer variable remains unaffected outside it.
- *Function-Scoped shadowing*:
  - *Definition:* Occurs when a variable declared within a function has the same name as a variable in an outer or global scope.
  - *Examples*: Languages with function-scoped variables, such as:
    - Older JavaScript (with `var`)
    - C
  - *Behaviour*: The function-level variable shadows any outer scope variable of the same name within the entire function, regardless of nested blocks.
- *Class-Level Shadowing*:
  - *Definition*: Occurs when a variable declared within a class (like an instance variable) is shadowed by a variable with the same name in a method or an inner class.
  - *Examples*: Object-oriented languages, such as:
    - Java
    - C++
  - *Behaviour*: Within the inner scope (like a method or inner class), the outer variable is hidden. To access the outer variable, an explicit qualifier (like `this` in Java) is often required.

Example of the JavaScript `var`:

```js
var x = 10;

function exampleFunction() {
    console.log(x); // undefined because `x` is hoisted and shadows the outer `x`
    
    var x = 5; // Shadows the outer `x` within the entire function scope

    if (true) {
        var x = 20; // This still refers to the function-level `x`, not a new block-scoped variable
        console.log(x); // 20
    }

    console.log(x); // 20 (the same `x` is accessible throughout the function)
}

exampleFunction();
console.log(x); // 10 (outer `x` remains unaffected)
```
