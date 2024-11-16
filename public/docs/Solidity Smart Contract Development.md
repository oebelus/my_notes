### Section 1: Simple Storage

#### 7. Functions

##### 🧑‍💻 Write a contract that features 3 functions

- a view function that can be accessed only by the current contract
- a pure function that's not accessible within the current contract
- a view function that can be accessed from children's contracts

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract SimpleStorage {
 uint16 hisFavouriteNumber;
 
 // a view function that can be accessed only by the current contract
 function getHisFavouriteNumber() private view returns (uint16)
 {
  return hisFavouriteNumber;
 }

 // a pure function that's not accessible within the current contract
 function sum(uint16 x, uint16 y) external pure returns (uint16) 
 {
  return x + y;
 }

 // a view function that can be accessed from children's contracts
 function getMyFavouriteNumber() internal view returns (uint16) 
 {
  return hisFavouriteNumber;
    }
}
```

#### 8. Arrays and structs

##### 📕 Define the difference between a _dynamic_ array and a _static_ array. Make an example of each.

- A **dynamic array** does not have a fixed size; it can grow or shrink as needed.

```solidity
int256[] primes;
```

- A **static array** has a fixed size that cannot be changed after the array is declared.

```solidity
int256[12] months;
```

##### 📕 What is an _array_ and what is a _struct_?

- An _array_ is a data structure that stores a collection of elements of the same type, arranged in a sequence (indexed).
- A _struct_ is a custom data structure that allows you to group different types of fata into a single entity or custom type.

##### 🧑‍💻 Create a smart contract that can store and view a list of animals. Add manually three animals and give the possibility to the user to manually add an indefinite number of animals into the smart contract.

```solidity
contract SimpleStorage {
 string[] animals;
 
 function addAnimal(string memory animal) public 
 {
  animals.push(animal);
 }

 function retrieve() public view returns (string[] memory) 
 {
  return animals;
 }

 function store(string[] memory _animals) view public 
 {
  _animals = animals;
 }
}
```

#### 10. `memory`, `calldata` and `storage`

##### 📕 How does the Solidity compiler handle primitive types and strings in terms of memory management?

- _Primitive types:_
  - **_Storage_:**
    - State variables (e.g., `uint`, `bool`, `address`) are stored in storage.
    - Solidity optimizes storage by _packing smaller data types together_ if they fit within a 256-bit word
      - _Example:_ `uint8` or `bool` can share a slot if declared sequentially.
  - _**Memory**:_
    - For local variables and function parameters, primitive types are allocated in memory during function execution.
  - _**Calldata**:_
    - For `external` function parameters, data resides in calldata, which is cheaper to use than memory since it doesn't require copying data unless modified.
  - _**String and Arrays:**_ (Dynamic Arrays including `string`)
  - _**Storage**:_
    - When strings are stored as state variables, they’re stored in storage as a dynamic array of bytes.
    - Solidity _manages the length and pointer to the data_, allowing efficient storage but with higher gas costs when reading or modifying data.
  - _**Memory**_:
    - Strings in function scope (e.g., function arguments) are typically stored in memory, where Solidity dynamically allocates space.
  - _**Calldata**_:
    - When a `string` parameter is passed to an `external` function, Solidity uses calldata.
    - This avoids memory allocation costs, making it gas-efficient for read-only or unmodified data passed into the function.

##### 📕 Why can't the storage keyword be used for variables inside a function?

Because the variables inside a function's scope only need to exist temporarily during the function's execution and are discarded once it ends.

##### 🧑‍💻 Write a smart contract that uses storage, memory and calldata keywords for its variables

```solidity
contract SimpleStorage {
 string[] animals;
 
 function addAnimalMutable(string memory animal) public 
 {
  animal = string.concat(animal, "_chain");
  animals.push(animal);
 }
 
 function addAnimal(string calldata animal) public 
 {
  animals.push(animal);
 }
 
 function updateAnimal(uint index, string memory newAnimal) public 
 {
  // Update the animal in storage
  animals[index] = newAnimal;
 } 
}
```

- I used `storage` to get a pointer to the element in the `animals` array.

#### 11. Mappings

1. ##### 📕 In which cases is better to use an array instead of a mapping?

- _Arrays:_
  - _**Ordered data:**_
    - Arrays are stored sequentially, making them ideal for situations where the order of elements matters.
  - _**Fixed Length or Known Number of Elements**:_
    - Using `uint8` or smaller data types can allow Solidity to pack elements into a single storage slot, which optimizes gas costs.
  - _**Retrieving the Length or Iterating Through Elements**:_
    - Arrays have a built-in `length` property.
    - Mappings lack a `length` property and don’t allow for direct iteration (you need to loop through them to count).
  - _**Packing Small Data Types**:_
    - When dealing with small data types like `uint8` or `bool`, arrays can be gas-efficient because Solidity can pack elements tightly within a storage slot.
    - In Mappings, Solidity uses a unique slot per key-value pair.

- _Mappings:_
  - Solidity is the first language where mapping is cheaper than arrays.
  
  - _**Direct Lookup with Unique Keys**:_
    - If you’re only interested in retrieving values by specific keys and don’t need to iterate through elements, mappings are the better choice.
    - Constant-time lookup by key.
  - _**Storing a Large, Unordered Set of Data**:_
    - If the data doesn’t need to be accessed in order or sequentially, mappings save gas, as they avoid the need for iterating and take less storage space.

- This pattern can mimic an array-like structure with a mapping:

```solidity
struct Array {
  mapping(uint => someType) items;
  uint length;
}
```

However, this approach does not support packing or ordered access, so it’s mainly useful when you need dynamic resizing and direct lookups without iterating through all items.

##### 🧑‍💻 Create a Solidity contract with a mapping named `addressToBalance`. Implement functions to add and retrieve data from this mapping.

```solidity
contract AddressBalanceStorage 
{
 mapping(address => uint256) public addressToBalance;

 function addAddress(address _address, uint256 _balance) public 
 {
  addressToBalance[_address] = _balance;
 }
 
}
```

- Since the `addressToBalance` mapping is marked as `public`, Solidity will automatically generate a getter function, so no additional function is required to retrieve balances. You can simply call `addressToBalance(address)` to get the balance.

### Section 2: Storage Factory

#### 3. Deploying a contract from a contract

##### 📕 What does the `new` keyword tell to the compiler?

The `new` keyword tells the compiler to create a new instance of a contract.

##### 🧑‍💻 Create a contract `AnimalFactory` that includes a function `createAnimals`. This function must be capable of deploying the other 2 contracts `Cows` and `Birds`, which are simple contracts with just a constructor method

```solidity
// Animal.sol
contract Cows {
 constructor() {
 }
}

contract Birds {
 constructor() {
 
 }
}
```

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Cows, Birds} from "./Animal.sol";

contract AnimalFactory {

 Cows[] public listOfCowsContracts;
 Birds[] public listOfBirdsContracts;

 function createAnimals() public {
  Cows newCowsContracts = new Cows();
  Birds newBirdsContracts = new Birds();
  
  listOfCowsContracts.push(newCowsContracts);
  listOfBirdsContracts.push(newBirdsContracts);
    }
}
```

#### 6. Deploying a contract from a contract

###### 📕 What do you need to interact with an external contract?

To interact with an external contract, I will need:

1- The contract address;

2- The ABI (Application Binary Interface), generated by the compiler, it's a standardized way for interacting with the binary version of a smart contract deployed on the blockchain. It specifies:

- the function
- their parameters
- the structure of the data that can be used to interact with the contract

##### 🧑‍💻 Deploy 3 instances of the `SimpleStorage` contract through the `StorageFactory`. Then store some numbers via `sfStore` and retrieve all of them via `sfGet`.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SimpleStorage } from "./SimpleStorage.sol";

const StorageFactory {

 SimpleStorage[] public listOfSimpleStorageContracts;

 function createSimpleStorageContract() public {
  SimpleStorage newSimpleStorageContract = new SimpleStorage();
  listOfSimpleStorageContracts.push(newSimpleStorageContract);
 }

 function sfStore(uint256 _simpleStorageIndex, uint256 _newSimpleStorageNumber) public {
  SimpleStorage mySimpleStorage = listOfSimpleStorageContracts[_simpleStorageIndex];
  mySimpleStorage.store(_newSimpleStorageNumber) 
 }

 function sfGet(uint256 _simpleStorageIndex) public view returns(uint256) {
  SimpleStorage mySimpleStorage = listOfSimpleStorageContracts[_simpleStorageIndex]
  return mySimpleStorage.retrieve();        
 }
}
```

### Section 3: Fund Me

#### 3. Sending ETH through a function

##### 📕 Describe the role of the `payable` keyword. How does it affect the functionality of a function?

- Payable marks the function as able to receive Ethereum.

##### 📕 Explain how the `require` statement works in Solidity and what prevents.

- `require` keyword sets a minimum threshold for Ether, allowing the function to execute only if the specified condition is met. Otherwise, it throws an error message. Here is an example:

```solidity
 require(msg.value > 1e18, "Not Enough Ether");
```

##### 📕 What's the difference between Wei, Gwei and Ether?

- 1 Ether = 1e9 Gwei = 1e18 Wei

##### 🧑‍💻 Create a `tinyTip` function that requires the user to send less than 1 Gwei.

```solidity
function tinyTip() public payable {
 require(msg.value < 1e9, Too Much Ether");
}
```

#### 4. Solidity Reverts

##### 📕 Describe the two types of transactions listed in this lesson.

| Type                                              | Value Transer                                                                                                 | Contract Interaction Transaction                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Nonce                                             | transaction counter for the account                                                                           | transaction counter for the account                                                                           |
| Gas Price (Wei)                                   | maximum price that the sender is willing to pay _per unit of gas_                                             | maximum price that the sender is willing to pay _per unit of gas_                                             |
| Gas Limit                                         | maximum amount of gas the sender is willing to use for the transaction. A common value could be around 21000. | maximum amount of gas the sender is willing to use for the transaction. A common value could be around 21000. |
| To                                                | _recipient's address_                                                                                         | _address the transaction is sent to (e.g. smart contract)_                                                    |
| Value (Wei)                                       | amount of cryptocurrency to be transferred to the recipient                                                   | amount of cryptocurrency to be transferred to the recipient                                                   |
| Data                                              | _empty_                                                                                                       | 📦 _the content to send to the **To** address_, e.g. a function and its parameters.                           |
| v, r, s (components of the transaction signature) | They prove that the transaction is authorised by the sender.                                                  | They prove that the transaction is authorised by the sender.                                                  |

##### 📕 Why are reverts used?

- In the case of transaction failure, the reverts undoes all prior operations and return the remaining gas to the transaction's sender.
- But the gas used in the transaction won't be refunded because it's already consumed (the code was executed by the computers).

##### 🧑‍💻 Bob sets his gas price to 20 Gwei and his gas limit to 50,000 units. The transaction consumes 30,000 units of gas before a revert occurs. How much ETH will be effectively charged?

- **Gas Price:** 20 Gwei
- **Gas Limit:** 50,000 units (this is the maximum Bob is willing to pay for)
- **Gas Used before Revert:** 30,000 units
- Total Gas Cost (in Gwei): `Gas Used×Gas Price=30,000×20=600,000 Gwei`
- Convert Gwei to ETH: `600,000 Gwei=0.0006 ETH`

 => He will get charged **0.0006 ETH**.

#### 8. Solidity interfaces

##### 📕 Explain the role of interfaces in Solidity and why are they advantageous.

- Interfaces allow different contracts to interact with one another, even if they are created independently, by ensuring they follow a shared set of functionalities.

##### 📕 What are the steps required to convert a variable containing a value in ETH to its equivalent in USD?

 1- Retrieve the current ETH/USD price using a Chainlink Data Feed contract.
 2- To interact with this Data Feed, define an interface (e.g., `AggregatorV3Interface`) for the contract.
 3- Use the `latestRoundData` function provided by the interface to get the latest price of Ethereum in USD.
 4- Multiply the `msg.value` (ETH amount) by the retrieved price to convert it into USD.

##### 🧑‍💻 Implement another function on the `FundMe` contract that implements the `decimals()` methods of the Data Feed address.

```solidity
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function getDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }
}
```

#### 10. Importing libraries from NPM and GitHub

##### 📕 What is this statement `@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol` translated into when interpreted by the solidity compiler?

- It is interpreted by the Solidity compiler as an import path for a specific file within the Chainlink smart contract library. When the compiler sees this import path, it translates it into the contents of the `AggregatorV3Interface.sol` file.

#### 12. Solidity Math

##### 📕 Why is it important to multiply before dividing in Solidity calculations, and how does this practice help maintain precision?

- In Solidity, integer division truncates any decimal portion, which can lead to significant loss of precision when performing calculations involving fractions. To avoid this precision loss, it is generally best to multiply before dividing when dealing with ratios or conversions

##### 📕 What is the purpose of the `getConversionRate` function, and how does it utilize the `getPrice` function to convert ETH to USD?

- The `getConversionRate` function converts a given amount of ETH  into its equivalent in USD by using the latest ETH/USD price.

##### 🧑‍💻 Create a function `convertUsdToEth(uint256 usdAmount, uint256 ethPrice) public returns(uint256)`, that converts a given amount of USD to its equivalent value in ETH.

- Check [[Blockchain/Cyfrin Courses/Chainlink#Data Feeds|this]].

#### 15. Creating your own libraries

##### 📕 What are the differences between Solidity _libraries_ and _contracts_?

- **Libraries** cannot hold state or manage Ether, contracts can.

##### 📕 What are the consequences if a library function is not marked as `internal`?

- If any function is not marked as `internal`, the library cannot be embedded directly, but it must be deployed independently (increased gas cost) and then linked to the main contract.

#### 20. Sending ETH from a contract

##### 📕 What are the primary differences between _transfer_, _send_, and _call_ when transferring Ether?

- Check [[Smart Contracts#Withdraw funds with a smart contract|here]].

##### 📕 Why is it necessary to convert an address to a `payable` type before sending Ether to it?

- It's necessary to convert the recipient address to a **payable** address to allow it to receive Ether.

##### 🧑‍💻 Implement a function `callAmountTo` using `call` to send Ether from the contract to an address provided as an argument. Ensure the function handles failures appropriately

```solidity
function callAmountTo(address payable theAddress) public {
 uint256 amount = address(this).balance;
 (bool callSuccess, ) = theAddress.call{value: amount}("");
 require(callSuccess, "Send Failed");
}
```

- `address(this).balance` retrieves the contract's Ether balance.
- The recipient address `theAddress` is marked as `payable` to ensure it can receive Ether.

#### 21. Smart contract constructor

##### 📕 What is the purpose of a `constructor` function and how does it differ from regular functions?

- The constructor function is automatically called during contract deployment. And it doesn't need to be called to be executed, unlike regular functions.
- The constructor does not use the `function` and `public` keywords.

##### 📕 Why is it necessary to restrict access to the withdraw function?

- Because if not, everyone could call it and withdraw money and drain all the funds from the contract.

##### 🧑‍💻 Write a function called `withdrawOnlyFirstAccountRemix` that allows only the first Remix account to withdraw all funds from the contract.

```solidity
contract FundMe {
 address public firstAccount;

 constructor() {
  firstAccount = address(0);
 }

 function withdrawOnlyFirstAccountRemix() public {
  require(msg.sender == firstAccount, "Only first account is allowed to withdraw")

  // Rest of the function
 }
}
```

#### 22. Solidity function modifiers

##### 📕 Why is it beneficial to use `modifiers` for access control?

- To avoid repetition of code;
- To make code less cluttered;
- Code easier to read;
- Easier to debug;
- Easier to maintain;

- ##### 🧑‍💻 Implement a modifier named `onlyAfter(uint256 _time)` that ensures a function can only be executed after a specified time

```solidity
{
 uint256 public initialTime;

 constructor() {
  initialTime = block.timestamp;
 }

 function fund() public payable onlyAfter(10) {
  // Function Logic
 }

 modifier onlyAfter(uint256 _time) {
  require(block.timestamp >= initialTime + _time, "Function can only be executed after the specified time");
  _;
 }
}
```

#### 24. Immutability and constants

##### 📕 Why a developer can choose to use `immutable` instead of `constant` for specific variables?

- `immutable` can be used for variables _**set at deployment time**_ (runtime) that will only be set once, `constant` requires values to be set at compile time.

##### 🧑‍💻 Invent one `constant` variable and one `immutable` variable that can be integrated into the current version of the `fundMe` contract.

- Check [Here]("/my_notes/Basic Solidity Concepts").

#### 25. Creating custom errors

- What are the benefits of declaring custom errors instead of using the `require` keyword?
  - To improve gas efficiency.

- ##### 🧑‍💻 Create a custom error that is triggered when `msg.sender` is address(0) and then convert it into an equivalent if statement with a `revert` function.

```solidity
error AddressZero();

if (msg.sender == address(0)) {
 revert AddressZero();
}
```

#### 26. Implementing the receive fallback

##### 📕 How does the `fallback` function differ from the `receive` function?

- The **`receive`** function is triggered **only** when Ether is sent to a contract **without calldata**.
  - It is designed specifically to handle simple Ether transfers.
- The **`fallback`** function is triggered when a transaction contains:
  - **calldata** that does not match any existing function in the contract
  - when Ether is sent and the contract has no `receive` function.
  - function calls that do not exist.  

    Both must be declared `external` and can be `payable` to accept Ether.

##### 📕 What does it happen when Ether is sent with _data_ but in the contract only a `receive` function exist?

- The transaction **reverts** because the `receive` function only handles Ether transfers **without calldata**.
  - Since no `fallback` function exists to handle the data, the EVM has no valid function to execute, resulting in a failure.
