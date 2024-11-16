## Basic Contract Structure

- The pragma directive specifies which compiler version to use
- *Contracts contain:*
- State variables that persist in blockchain storage
- A constructor that runs once during deployment
- Functions that define contract behavior
- Modifiers that add reusable checks
- Events for logging
- Custom error definitions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractName {
    // State variables
    Constructor() {
     // Something
    }
    // Functions
    // Modifiers
    // Events
}
```

- The constructor does not use the `function` and `public` keywords.

## Data Types

There are two main categories:

### Value Types

- Integers (uint/int): Both signed and unsigned with different bit sizes
- Boolean: Simple true/false values
- Address: Holds Ethereum addresses, with regular and payable variants
- Bytes: Fixed-size byte arrays for raw data storage
- Enums: Custom types with predefined set of values

```solidity
// Integers
uint256 unsignedInteger = 100;
int256 signedInteger = -100;
uint8, uint16, ..., uint256
int8, int16, ..., int256

// Boolean
bool isTrue = true;

// Address
address wallet = 0x123...;
address payable payableWallet = payable(0x123...);

// Bytes
bytes32 data;
bytes memory dynamicBytes;

// Enums
enum Status { Pending, Approved, Rejected }
Status public status = Status.Pending;
```

### Reference Types

- Arrays: Both fixed-size and dynamic arrays
- Strings: For text storage, internally stored as bytes
- Structs: Custom data structures grouping related data
- Mappings: Key-value pair storage, like hash tables

```solidity
// Arrays
uint[] dynamicArray;
uint[5] fixedArray;

// Strings
string name = "Solidity";

// Structs
struct Person {
    string name;
    uint age;
    address wallet;
}

// Mappings
mapping(address => uint) public balances;
mapping(address => mapping(address => uint)) allowances;
```

A mapping is defined using the mapping keyword, followed by the key type, the value type, the visibility, and the mapping name.

## Memory, Calldata and Storage

The EVM can read and write to several places, including *memory*, *calldata* and *storage*.
 => They are defined for reference types.

> Data location can only be specified for array, struct, or mapping type.

\- In Solidity, `calldata` and `memory` are temporary storage locations for variables during function execution.

- `calldata` =

  - read-only
  - used for function inputs that can't be modified.
  - to modify `calldata` variables, they must first be loaded into `memory`.
  - mostly used for input parameters.
  - `memory` =
  - allows for read-write access -> variables can be changed within the function.

>Most variable types default to `memory` automatically. However, for **strings**, you must specify either `memory` or `calldata` due to the way arrays are handled in memory.

- `storage` =

  - persistent on the blockchain, retaining their values between function calls and transactions.

```solidity
contract MyContract {
    uint256 favoriteNumber; // this is a storage variable
};
```

>You can't use the `storage` keyword for variables inside a function. Only `memory` and `calldata` are allowed here, as the variable only exists temporarily.
>
## Functions

### Function Types

- Basic functions that can modify state

```solidity
function functionName(uint x) public returns (uint) {
    return x + 1;
}
```

- View functions that only read state, it doesn't modify it

```solidity
function getValue() public view returns (uint) {
    return someValue;
}
```

- Pure functions that neither read nor modify state

```solidity
function calculate(uint x) public pure returns (uint) {
 return x * 2;
}
```

- Payable functions that can receive native blockchain tokens such as ETH

```solidity
function deposit() public payable {
    // Handle ETH deposit
}
```

- External functions callable only from outside (and not from inside the contract)

```solidity
function externalFunction() external {
    // Can only be called from outside
}
```

- Internal functions for internal contract use

```solidity
function internalFunction() internal {
    // Can only be called from inside
}
```

- Private functions restricted to the defining contract

```solidity
function privateFunction() private {
    // Can only be called from this contract
}
```

>📞While calling `view` or `pure` functions doesn’t typically require gas, they do require it when called by another function that modifies the state or storage through a transaction.
> This cost is called **execution cost** and it will add up to the transaction cost.


## Function Modifiers

```solidity
// Custom modifier
modifier onlyOwner {
    require(msg.sender == owner, "Not owner");
    _;
}

// Using modifier
function privilegedFunction() public onlyOwner {
    // Only owner can call this
}

// Modifier with parameters
modifier costs(uint price) {
    require(msg.value >= price, "Not enough ETH");
    _;
}
```

## Immutability and constants

`constant` and `immutable` are used to optimize gas usage, because they don't occupy a storage slot anymore but directly into the bytecode of the contract.

- We apply these keywords to variables assigned once and never change.

#### Constant

For values known at **compile time**, use the `constant` keyword. It prevents the variable from occupying a storage slot, making it cheaper and faster to read.

Using the `constant` keyword can save approximately 19,000 gas, which is close to the cost of sending ETH between two accounts.

```solidity
uint256 public constant MIN_USD = 5e18;
```

Naming conventions for `constant` are all caps with underscores in place of spaces.

#### Immutable

`immutable` can be used for variables set at deployment time that will not change, for variables that will only be assigned once;

Similar gas saving compared to `constant`.

```solidity
address public immutable i_owner;
```

The naming convention for `immutable` variables is to add the prefix `i_` to the variable name.

## Events

```solidity
// Event declaration
event Transfer(address indexed from, address indexed to, uint256 value);

// Emitting events
function transfer(address to, uint256 value) public {
    // ... transfer logic ...
    emit Transfer(msg.sender, to, value);
}
```

## Error Handling

```solidity
// Require
require(condition, "Error message");

// Revert
revert("Error message");

// Assert
assert(condition);

// Custom errors
error NotOwner();

if (msg.sender != i_owner) {
    revert NotOwner();
}
```

### > `require`

In Solidity, `msg.value` represents the amount of Ether sent with a transaction, and you can specify it in various denominations. Here’s a list of units, from smallest to largest, that you can use with `msg.value`:

1- `wei` - The smallest unit (1 wei = 1)

2- `gwei` - Commonly used for gas prices (1 gwei = 10^9 wei)

3- `szabo` - 1 szabo = 10^12 wei

4- `finney` - 1 finney = 10^15 wei

5- `ether` - The main unit (1 ether = 10^18 wei)

```solidity
require(msg.value < 1 ether, "Too much Ether sent");
require(msg.value >= 500 szabo, "Not enough Ether sent");
```

## Special Variables & Functions

```solidity
// Block and Transaction Properties
block.timestamp    // Current block timestamp
block.number      // Current block number
msg.sender        // Address of the sender
msg.value        // Amount of ETH sent
gasleft()        // Remaining gas

// Address Members
address.balance   // Balance in Wei
address.transfer(amount)   // Transfer ETH (2300 gas, throws error)
address.send(amount)       // Transfer ETH (2300 gas, returns bool)
address.call{value: amount}("") // Low-level call
```

## Interacting with contracts ABI

**ABI** stands for **Application Binary Interface**. It is a standardized way for contracts to interact with each other and with external applications. ABI defines how to encode function calls and decode returned data so that external applications (web interfaces, other smart contracts...) know exactly how to communicate with the contract.

An example of an ABI entry for a function:

```json
{
  "name": "store",
  "type": "function",
  "inputs": [{ "name": "_newSimpleStorageNumber", "type": "uint256" }],
  "outputs": [],
  "stateMutability": "nonpayable"
}
```

### How Solidity uses ABI internally

When you create and interact with instances of other contracts, the Solidity compiler automatically includes the ABI of `SimpleStorage` in your compiled code.

- This allows the `StorageFactory` contract to correctly call functions on `SimpleStorage` instances using the correct encoding and decoding, without providing the ABI manually.

### Using ABI in External Applications

If you want to interact with a contract from outside the blockchain (e.g., through a JavaScript application using Web3.js or Ethers.js), you’ll need the ABI. These libraries use the ABI to encode function calls and decode responses when interacting with the contract.
