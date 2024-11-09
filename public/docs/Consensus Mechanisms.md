A consensus mechanism enables blockchain networks to reach a collective agreement on the current state of data, even when individual nodes may not trust each other. It ensures that all nodes can trust the shared ledger, establishing reliability and integrity across the network.

##### 1- Proof of Work (PoW) (+ longest chain rule = Chain Selection Rule)

**_Overview:_**

- Proof of Work is a consensus mechanism where participants (miners) compete to solve complex mathematical puzzles.
- PoW is a widely-used consensus mechanism for many existing cryptocurrencies.
- The first miner to solve the puzzle gets the right to add the next block to the blockchain and is rewarded with cryptocurrency.

**_Examples:_** - Litecoin, and Bitcoin.   - Ethereum was using PoW mechanism, but now shifted to Proof of Stake(PoS).

**_Core Principle:_** - The PoW process relies on finding a computational solution that is ~={magenta}challenging to generate=~ but ~={magenta}simple to verify=~, ensuring security while preventing tampering. - The 'block', 'nonce', and 'data' are un through the hash algorithm, producing the hash for that block. - As a result, even a minor change in the data leads to an entirely different hash, hence, invalidating the block.

**_Mining Process:_**

- **Mining** involves a trial-and-error process to find a nonce that, when hashed with the block data, produces a hash following a specific pattern (e.g., starting with four zeros).

**_Consensus and Chain Selection Rule:_**

- For PoW to establish consensus, it must be combined with a **chain selection rule** that determines the valid blockchain.
- Both Bitcoin and early Ethereum implementations used **Nakamoto Consensus**, a combination of:
  - **Proof of Work** for block validation.
  - **Longest Chain Rule** to identify the valid, or "real," blockchain by selecting the chain with the most cumulative work.

**_Drawbacks:_**

- Proof of Work consumes a LOT of electricity.

**_How Proof of Work Works?_**

- _Transaction validation:_
  - All transactions in the new block are first validated.
  - This block is then added to the blockchain through PoW’s mining process.
- _Longest chain rule:_
  - PoW uses a rule where, if there is a split (or fork), the chain with the longest sequence of validated blocks is considered the main chain.
- _Mining process:_
  - _Mining nodes:_
    - Special nodes, known as [[Blockchain Fundamentals#^94439b|miners]], perform extensive computational work by solving complex mathematical puzzles.
  - _Proof-of-Work:_
    - The miner who successfully solves the problem first gets to add the new block to the chain -> this successful computation is their “proof of work.”
  - _Increasing difficulty:_
    - Over time, the mathematical puzzles become progressively harder, requiring greater computational resources and energy.
- _Mining reward:_
  - _Incentive for Miners_:
    - The network grants a **mining reward** to the first miner who successfully solves the puzzle and adds a new block.
      - Often consists of newly minted cryptocurrency and transaction fees from the included transactions.
  - _Reward reduction:_
    - Many PoW blockchains, like Bitcoin, periodically reduce the reward over time (known as "~={yellow}halving=~") to control inflation and increase scarcity, potentially boosting the cryptocurrency’s value.

```javascript
class Block {
  mine(difficulty) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined:", this.hash);
  }
}
```

**_Blockchain attacks_**:
There are two major types of attacks that exist in the blockchain space.

- _Sybil Attack_ - When a user creates a number of pseudo-anonymous accounts to try to influence a network.
- _51% attack_ - Occurs when a single entity possesses both the longest chain and majority network control. This would allow the entity to `fork` the chain and bring the network onto the entities record of events, effectively allowing them to validate anything.

**_Overview of the mathematical problems used by various PoW systems_**

1- _Bitcoin (SHA-256)_

> **Mathematical Problem**: Find a nonce that, when hashed with the block's header using SHA-256, produces a hash that is less than a target value.

```js
const crypto = require("crypto");

function calculateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function mineBlock(blockData, prefix) {
  let nonce = 0;
  let hash;
  const target = "0".repeat(prefix); // Target hash based on difficulty level

  do {
    hash = calculateHash(blockData + nonce);
    nonce++;
  } while (hash >= target);

  return { hash, nonce };
}

// Example
const blockData = "Block data here";
const prefix = 4;
const minedBlock = mineBlock(blockData, prefix);
```

2. _Litecoin (Scrypt)_
   > **Mathematical Problem**: Similar to Bitcoin, but uses the Scrypt algorithm, which is designed to be more memory-intensive to prevent ASIC mining.

```js
const scrypt = require("scrypt");

function calculateHash(data) {
  return scrypt
    .hash(blockData + nonce.toString(), { N: 16384, r: 8, p: 1 })
    .update(data)
    .digest("hex");
}

function mineLitecoin(blockData, prefix) {
  let nonce = 0;
  let hash;
  const target = "0".repeat(prefix); // Target hash based on difficulty level

  do {
    hash = calculateHash(blockData + nonce);
    nonce++;
  } while (hash >= target);

  return { hash, nonce };
}

// Example
const blockData = "Block data here";
const prefix = 4;
const minedBlock = mineBlock(blockData, prefix);
```

Dogecoin uses the same Scrypt algorithm with a focus on faster processing times.

3. _Zcash (Equihash)_
   > **Mathematical Problem**: Zcash uses the Equihash algorithm, which is based on the Generalized Birthday Problem, requiring miners to find a solution that satisfies certain properties.

Equihash is significantly more complex to implement than SHA-256 or Scrypt. The specifics would typically be handled in existing mining software, like zcashd.

\> **_how can a miner create new coins?_**
There is a space to add a special transaction, called "**coinbase**", in the blocks. For every mined block, the reward coins are sent to the public key written in the coinbase.

A miner adds their own public key and as a result receives the reward coins.

###### RECAP

1- The sender sends the transaction. 2. Verification of the transaction: We have to make sure that the sender of the transaction really authorized it. 3. The blockchain asks each transaction to include a unique **signature** that only the sender can produce with the sender's own private key. 4. Others in the network can verify that a signature is valid for a transaction by only using the sender's public key. 5. When the transaction is validated, it is added to a block.

> Such a system ensures a reliable financial transaction ecosystem, which can support its own digital currency. - Bitcoin is the digital currency for Satoshi's blockchain system.

##### 2. Proof of Stake (PoS)

**_Overview:_**

- Proof of Stake is a consensus mechanism where validators are chosen to create new blocks based on the amount of cryptocurrency they hold (stake).
- PoS is more energy-efficient than PoW.
- Promotes decentralization by allowing more participants to validate transactions without needing expensive hardware

> In a Proof of Stake system, miners are known as validators. They aren't actually mining blocks, they're validating other nodes.

**_Examples:_**

- _Ethereum 2.0_
  - Ethereum is transitioning from PoW to PoS to improve scalability and reduce energy consumption.
- _Cardano and Tezos_.

**_Pros:_**

- Great sybil resistance mechanism.
- Great for the environment, much less energy.
  **_Cons:_**
- Seen as less decentralized due to upfront staking costs.

**_How proof of stake works?_**

- _Transaction validation:_
  - Instead of competing to solve complex puzzles like in Proof of Work (PoW), participants are selected to validate new transactions and create new blocks based on the size of their stake.
- _Selection process:_
  - The more cryptocurrency a participant holds (and is willing to lock up), the higher their chances of being chosen to validate a block.
    - Some systems may also consider factors like how long the stake has been held.
- _Security Incentives:_
  - Validators have their funds at risk; if they act dishonestly or validate fraudulent transactions, they could lose their staked coins.
