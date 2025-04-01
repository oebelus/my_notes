#### 1. What are the possible ways to create objects in JavaScript?

- Object literal syntax:

```js
var object = {
     name: "Imane",
     age: 24
};
```

- Object constructor:

```js
let object_1 = new Object();
let object_2 = Object();
```

- Object's create method:

```js
let object = Object.create(null);
```

- Function constructor:

```js
function Person(name) {
  this.name = name;
  this.age = 21;
}
var object = new Person("Imane");
```

- Object's assign method:
The `Object.assign` method is used to copy all the properties from one or more source objects and stores them into a target object.

```js
const orgObject = { company: `XYZ` };
const carObject = { name: 'Toyota' };
const staff = Object.assign({}, orgObject, carObject);
```

- ES6 class syntax:

```js
class Person {
 constructor(name) {
  this.name = name
 }
}

let object = new Person("Imane");
```

- Singleton pattern:
A Singleton is an object which can only be instantiated one time. Repeated calls to its constructor return the same instance. This way one can ensure that they don't accidentally create multiple instances.

```js
let object = new (function() {
 this.name = "Imane";
})
```

#### 2. What is a prototype chain?

**Prototype chaining** is used to build new types of objects based on existing ones. It is similar to inheritance in a class based language.

#### 3. What is the difference between `setInterval` and `setTimeout`?

The main difference between `setTimeout` and `setInterval` is that **`setTimeout` executes the code only once after the specified delay, while `setInterval` executes the code repeatedly at the specified interval**.

```javascript
// setTimeout example
setTimeout(function() {
  console.log("This code will be executed once after a 2-second delay.");
}, 2000);

// setInterval example
setInterval(function() {
  console.log("This code will be executed every 1 second.");
}, 1000);
```

#### 4. What is the difference between `var`, `let`, and `const` in JavaScript?

- `var` is function-scoped and was traditionally used to declare variables.
- `let` and `const` are block-scoped.
 	- `let` allows for reassignment.
 	- `const` creates a read-only reference.

#### 5. What is the difference between `null` and `undefined`?

- The `null` is an assignment value. It can be assigned to a variable as a representation of no value.
- The `undefined` is a primitive (immutable) value that represents the absence of a value, or a variable that has not been assigned a value.

#### 6. What is the difference between `==` and `===`?

- The `==` equality operator converts the operands if they are not of the same type, then applies strict comparison.
- The `===` strict equality operator only considers values equal that have the same type.

#### 7. What are Scopes in JavaScript?

A scope is a set of variables, objects, and functions that you have access to. There are three types of scopes in JavaScript.

- Global Scope.
- Function Scope (Local Scope).
- Block Scope.

#### 8. How to implement your own Custom Event in JavaScript?

You can use the `CustomEvent` constructor to create a custom event. It accepts two arguments:
 - The event name.
 - An optional object that specifies the event options.

And you can use the `dispatchEvent` method to dispatch the custom event on the target element/document.

1. *Creating Custom Events*

```js
const event = new CustomEvent('roadmap-updated', {
 detail: { name: 'JavaScript' },
});
element.dispatchEvent(event);
```

2. *Listening for Custom Events*

```js
element.addEventListener('roadmap-updated', (event) => {
 console.log(event.detail); // { name: 'JavaScript' }
});
```

3. *Removing Event Listeners*

```js
function handleEvent(event) {
 console.log(event.detail); // { name: 'JavaScript' }
}

element.addEventListener('roadmap-updated', handleEvent);
element.removeEventListener('roadmap-updated', handleEvent);
```

#### 9. What is a scope?

The scope of a variable refers to the **context** within which it is defined and accessible. This context is usually determined by the block of code, typically enclosed in curly braces `{}`, where the variable is declared.
