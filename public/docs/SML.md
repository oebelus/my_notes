A ML program is a sequence of bindings. Each binding adds to the static environment (for type-checking subsequent bindings) and to the dynamic environment (for evaluating subsequent bindings).

### A variable binding

Here's an example of how variables are created and how SML keeps track of their static and dynamic environments:

```SML
var x = 7;
(* static environment: x : int *)
(* dynamic environment: x--> 7 *)

var y = 17;
(* static environment: x : int, y : int *)
(* dynamic environment: x--> 7, y--> 17 *)

val z = (x + y) + (y + 2);
(* static environment: x : int, y : int, z : int *)
(* dynamic environment: x--> 7, y--> 17, z--> 43 *)
```

Static vs. Dynamic Environment:

- *Static Environment*: the types associated with variables, checked before the program runs.
- *Dynamic Environment*: it's the reason why I can't use later bindings in SML, since it keeps track of values as the program executes. It's built-up line by line -> variables must be declared before they can be referenced or used.

##### Loading a program in SML

When running `use "first.sml";` in the SML shell:

```bash
[opening first.sml]

val x = 7 : int
val y = 17 : int
val z = 43 : int
val it = () : unit
```

This just means that we create 2 variables:

- `x` of type int,
- `y` of type int,
The last line is the result of successfully executing `use`.

##### Variable assignment

- Each `val` in SML introduces a new binding, rather than modifying an existing one. There's no reassignment, only new bindings. It's called [Variable shadowing](https://oebelus.github.io/my_notes/Shadowing).

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

### Conditionals

If we add this part of code:

```SML
val abs_of_z = if z < 0 then 0 - z else z; (* bool *) (* int *)
(* static environment: x : int, y : int, z : int. abs_of_z: int *)
(* dynamic environment: x--> 7, y--> 17, z--> 43, abs_of_z--> 43 *)
```

### Function Binding

It is something that is called with arguments and has a body that produces a result. Unlike a method, there is no notion of a class, this, etc. We also do not have things like return statements.

*Example:*

```sml
fun pow (x:int, y:int) = 
 if (y = 0)
 then 1
 else x * pow(x, y-1)
```

If y < 0, the function would run forever because y would never reach the base that is 0.

*Syntax:*

```sml
fun x0 (x1: t1, ..., xn: tn) = e
```

	-> `e` is an expression for the body.

*Evaluation:*
A function is a value:

- we simply add x0 to the environment as a function that can be called later.
- As expected for recursion, x0 is in the dynamic environment in the function body and for subsequent binding, but not for preceding bindings (unlike Java).
 	- The order you define functions is very important.
