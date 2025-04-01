Before talking about Tagged Unions, I have to say something about Unions. It's a data structure used to hold a value that could take on different, but fixed, types. This concept is useful in functional programming languages such as ML and Haskell.

>In Haskell, they are called datatypes.

Here is an example:

```haskell
data Tree a = Nil
    | Node a (Tree a) (Tree a)
```

In C, it's one of the most dangerous features:

```C
union num_str {
 short num;
 char *str;
}
```

<div align="center">
<img src="https://i.imgur.com/CITtbFj.png" />
</div>

They are dangerous because, when writing C code, you need to remember which variant you set in the union. If you set one type of value but then access the other, the program will crash.

And here comes the use of Tagged Unions as a solution. It keeps track of which union is valid using a tag (an integer value) saved right next to the union in memory.

```c
struct tagged_num_str {
 short tag;
 union num_str {
  short num;
  char *str;
 }
}
```

You can, for example, set that `tag = 1` is a `short` and `tag = 2` is a `string`.

Another example from Crafting Interpreters:

```C
typedef struct {
  ValueType type;
  union {
    bool boolean;
    double number;
  } as; 
} Value;
```

<div align="center">
<img src="https://craftinginterpreters.com/image/types-of-values/value.png" />
</div>
