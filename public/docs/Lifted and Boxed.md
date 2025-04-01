So I came across these two words from reading Category Theory For Programmers, in this [article](https://www.cs.ox.ac.uk/jeremy.gibbons/publications/fast+loose.pdf) . Here is a definition I found from Stack Overflow:

From the GHC docs:

- “lifted” type means that terms of that type may be bottom.
- “boxed” type means that a value is represented by a pointer to a heap object.

A bottom is a special 'value' corresponding to a non-terminating computation, and represented by the symbol `_|_` (Looks like a nose to me). In some languages, it's represented by `undefined`.

Bartosz Milewski mentioned in his series of articles:
>Once you accept the bottom as part of the type system, it is convenient to treat every runtime error as a bottom, and even allow functions to return the bottom explicitly.

Bottom can be returned as:

```haskell
f :: Bool -> Bool
f x = undefined
```

Functions that may return bottom are called partial, as opposed to total functions, which return valid results for every possible argument.

Because of the bottom, the category of Haskell types and functions referred to as **Hask** rather than **Set**. And it’s okay to ignore non-terminating functions and bottoms, and treat **Hask** as bona fide **Set**.

### `Void` and `()`

First of all, TYPES are SETS.

*Void*:

- It's an empty set in Haskell;
- You can define a function that takes `Void`, but you can never call it.

>To call a function with the type `void`, you should provide a value of the type `Void`, and there just aren’t any.

- It’s a function that’s polymorphic in the return type.

```haskell
absurd :: Void -> a
```

>The type `Void` represents falsity, and the type of the function `absurd` corresponds to the statement that from falsity follows anything, as in the Latin adage “ex falso sequitur quodlibet.”

This is very beautiful.

![void](https://pbs.twimg.com/media/GmKlcySXoAAZ_Bk?format=png&name=900x900)

*Unit*:

- It's a singleton set: a type that has only one possible value.
