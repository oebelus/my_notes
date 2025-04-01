What does it mean to be "within" a function? -Regurgitated Wikipedia [Scopes](https://en.wikipedia.org/wiki/Scope_(computer_science)) article to understand lexical vs. dynamic scope.

#### Lexical Scope (Static Scope)

If a variable name's scope is a certain function, then its scope is the program text of the function definition. In general, the lexical scope refers to the place in which the variable is created. Outside the that text, the variable doesn't exist.

This is a property of the program text and is made independent of the runtime call stack by the language implementation.

Languages:

- ALGOL-based languages: Pascal, Modula-2, Ada, C (and its syntactic and semantic relatives), Scheme.
- Modern functional languages: ML, Haskell.

History:

- It was first used in the early 1960 for the imperative language ALGOL 60 and has been picked up in most other imperative languages since then.
- Perl is a language with dynamic scope that added static scope afterwards.
- The original Lisp interpreter (1960) used dynamic scope. _Deep binding_, which approximates static (lexical) scope, was introduced around 1962 in LISP 1.5.

#### Dynamic Scope

If a variable name's scope is a certain function, then its scope is the time-period during which the function is executing: while the function is running, the variable name exists, and is bound to its value, but after the function returns, the variable name does not exist.

A name refers to execution context. It means that each name has a global stack of bindings. Introducing a local variable with name `x` pushes a binding onto the global `x` stack, which is popped off when the control flow leaves the scope. This cannot be done in compile-time since the binding stack only exists at runtime, and thus the name `dynamic` scope.

Languages:

- Perl, Common Lisp: they allow to choose static or dynamic scope when defining or redefining a variable.
- Logo, Emacs Lisp, LaTeX, Bash, Dash, PowerShell.

How does it work?

- To find a name's value, the program traverses the runtime stack, checking each activation record (function's stack frame) for a value for the name.
 1. This is made more efficient via the use of an association list (a stack of name/value pairs).
  - Pairs are pushed onto this stack whenever declarations are made, and popped whenever variables go out of context.
 2. Shallow binding is an alternative that is faster, making use of a central reference table, which associates each name with its own stack of meanings. It avoids linear search.
- Both these strategies assume a LIFO ordering to bindings.

#### Example

```bash
# bash language
x=1
function g() { echo $x ; x=2 ; }
function f() { local x=3 ; g ; }
f # does this print 1, or 3?
3
echo $x # does this print 1, or 2?
1
```

In this program:

- Static Scope: `g` prints and modifies the global variable `x`.
- Dynamic Scope: `g` prints and modifies `f`'s local variable `x` (because `g` is called from within `f`);
Since Bash is dynamic, the program prints 3 and then 1.
