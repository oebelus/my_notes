### 1- Definition and Core Concepts

- A blockchain is a distributed, decentralized, immutable ledger of transactions.

- Data is stored in blocks that are cryptographically linked together.

- DeFi: peer-to-peer system attempting to remove third parties and centralized institutions from financial transactions. It consists of cryptocurrencies, blockchain technology, and software that allows people to transact financially with each other.

- NFT: blockchain-based tokens that each represent a unique asset like a piece of art, digital content, or media. It can be thought of as an irrevocable digital certificate of ownership and authenticity for a given asset, whether digital or physical.

- Historical Evolution:
  - 2008: Satoshi Nakamoto publishes Bitcoin whitepaper
  - 2009: Bitcoin network launches
  - 2015: Ethereum introduces smart contracts
  - 2020+: DeFi and NFT revolution

### 2. Features of a blockchain

- _Persistency_:
  - Transactions can be validated quickly.
  - Invalid transactions would not be admitted by persons or miners who mining the crypto.
- _Decentralization_:
  - A third party is not needed in the blockchain. **Consensus algorithms** maintain data stability in decentralized networks.
- _Immutability_:
  - It is not possible to delete or roll back transactions once they are included in the blockchain network.
  - Data on a public blockchain is secure as it is not possible to modify once they are validated.
- _Anonymity_:
  - Each user can interact with the blockchain with a generated address, which does not disclose the real identity of the miner.
- _Auditability_:
  - Blockchain stores data of users based on the Unspent Transaction Output (UTXO) model.
    - The amount of digital currency remaining after a cryptocurrency transaction is executed.
    - UTXOs are processed continuously and are part of the beginning and end of each transaction.
- _Transparency_:
  - They track every transaction by the address.
- _Cryptography_:
  - The data is secured using cryptography.

> Unspent Transaction Output (UTXO) = is like the change you receive after after buying an item.

### 3. Components of a Blockchain

- _Nodes_:
  - Network participants and their devices
- _Transactions_:
  - A contract or agreement and transfers of assets between parties
- _Block_:
  - Records that store transactions.
  - Encrypted into a hash tree.
  - The transactions are kept track of using a [[#4. Block Structure|Block Structure]].
- _Chain_:
  - All the blocks are connected with the help of the previous block hash and it indicates a chaining structure.
- _Miners_:
  - Validation of every step in the transactions.
- _Consensus_:
  - A fault-tolerant mechanism that is used in computer and blockchain systems to achieve the necessary agreement on a single state of the network.
  - It is useful in record keeping.

### 4. Block Structure

- _Header:_
  - Used to identify the particular block in the entire blockchain.
  - A block header is hashed periodically by miners by changing the nonce value.
- _Previous Block Address/Hash:_
  - It is used to connect the (i+1)^th block to the i^th block using the hash.
  - It is a reference to the hash of the previous (parent) block in the chain.
- _Timestamp:_
  - A string of characters that uniquely identifies the document or event and indicates when it was created.
- _Nonce:_
  - A number that is only used once.
  - It is a central part of the proof of work in the block.
  - It is compared to the live target if it is smaller or equal to the current target.
  - People who mine, test, and eliminate many Nonce per second until they find that Valuable Nonce is valid.
- _Merkel Root:_
  - A data structure.
  - It allows the users to verify whether a transaction can be included in a block or not.

![Imgur](https://i.imgur.com/Fka4yEU.png)

Code:

```javascript
class Block {
  constructor(timestamp, data, previousHash = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }
}
```

### 5. Types of Blockchain

- _Public blockchain_:

  - Open participation.
  - Allows anyone to read, write, and verify ongoing activities.
  - _Examples:_ Bitcoin, Ethereum, Cardano.
  - **_Pros_**: Decentralization, Transparency, Immutability.
  - **_Cons_**:
    - _Scalability issues:_ lower transaction throughput and slower processing.
    - _Energy demand:_ some consensus mechanisms, like Proof of Work (PoW), are energy-intensive.
    - _Privacy:_ public visibility of transactions.
    - _Lack of flexibility:_ if there is a bug or error, you can’t do anything about it if a block (contract or transaction) is deployed.
    - _Very limited data storage_: data makes it much harder to run the code and increases energy spending.

- _Private blockchains:_

  - Restricted to authorized participants only, including miners.
  - Transaction visibility is limited to involved parties.
  - permission-based blockchain -> It works based on permissions.
  - Managed by the entity that owns the network.
  - _Use cases:_ Enterprise solutions, Supply chain management, Internal systems.
  - **_Pros_**:
    - _Performance and Speed:_ faster processing due to fewer nodes and reduced consensus requirements.
    - _Privacy:_ transactions and data are visible only to authorized participants.
    - _Control:_ centralized control allows easier governance and compliance with regulations.
  - **_Cons_**:
    - _Centralization_: less decentralized than public blockchains.
    - _Trust_: participants rely on a central authority.
    - _Limited Transparency_: hard for external auditors to verify data.

- _Consortium blockchain:_

  - Built by a consortium or an organization where access is restricted to member organizations.
  - More decentralized than private blockchains.
  - Commonly used in government or multi-organization settings.
  - _Use cases:_ Banking consortiums, Industry partnerships, Research collaborations.
    - **_Pros_**:
      - _Efficiency:_ better performance than public blockchains due to optimized nodes and consensus.
      - _Shared control:_ Governance is shared among consortium members, which can enhance trust and cooperation.
      - _Privacy and Security:_ access is restricted.
    - **_Cons_**:
      - _Complex governance:_ decision-making can be complex and slow due to multiple stakeholders with potentially conflicting interests.
      - _Partial/Less decentralization:_ more decentralized than private blockchains, but still have a limited number of participants, which can reduce some decentralization benefits?
      - _Interoperability:_ may face challenges integrating with other blockchains.

- _Hybrid blockchain:_
  - Combine features of both public and private blockchains.
  - Offer the benefits of both -> balances transparency with privacy based on requirements
  - _Examples:_ Dragonchain and IBM’s Food Trust.
  - **_Pros_**:
    - _Flexibility_: balances transparency and privacy as needed.
    - _Scalability and Performance_: designed for optimal performance with some transparency.
    - _Customizable access_: organizations can choose what data to share publicly.
  - **_Cons_**:
    - _Complexity:_ managing multiple access levels and integrations can be challenging.
    - _Governance Challenges:_ balancing governance between public and private aspects can be tricky.
    - _Potential for confusion:_ users may be unclear about access and transparency details.

#### Ledgers

- Distributed copies of all transactions
- Each node maintains a complete copy
- Ensures transparency and data integrity

### 6. Use cases

1- Challenges

_Example_ - a streaming platform like YouTube or Twitch:

- Storage: we'll need a huge amount of storage.
- Streaming: the latency between transactions and while doing a transaction.
- Content moderation: content quality and decentralization, since it would be harder to manage content without a central entity.

2- Use Cases

  _Example_ - A decentralized supply chain management for organic food products:

\> Benefits;

- Transparency in Sourcing
- Realtime Tracking
- Quality Insurance
- Fraud Prevention
- Streamlined Payment

\> The Process - We can't alter it

1- Form registration: product, how it is grown, origin...

2- Planting and growing

3- Harvesting: date, amount...

4- Processing and packaging

5- Transportation

6- Retail sale

7- Consumer interaction

\> The Challenges of this system:

- Data Integrity: we need to be sure that the process is correct
- Technology adoption, creating a learning curve
- Interoperability, should be able to work with the previous supply chain systems
- Cost

### 7. Nodes

- A single blockchain won't have all these types of nodes. The configuration depends on the blockchain and its specific needs.

  - _Full nodes_
    - Responsible for validating and storing a complete copy of the blockchain.
    - Ensures network integrity by verifying all blocks and transactions.
  - _Light nodes_
    - Only downloads and stores block headers rather than full transaction data.
    - Depends on full nodes to verify transactions, allowing faster, lighter access for simple transactions.
  - _Mining nodes_ ^94439b
    - Nodes in Proof-of-Work blockchains that compete to solve complex mathematical problems to validate transactions.
    - Can consist of one miner or a mining pool (a group of miners).
  - _Archival full nodes_
    - Stores the entire blockchain ledger containing all transaction history since inception.
    - Require a large amount of memory.
  - _Pruned full nodes_
    - Download and verify the full blockchain but delete older blocks once they reach a memory limit -> Pruning.
    - Retain only the most recent transactions and essential data to reduce storage needs.
      - If the size limit is 1 GB, it will hold the most recent gigabyte of transactions.
    - Blocks aren't fully deleted since their metadata and sequence remain.
  - _Masternodes_
    - Validates transactions and maintains a record of the blockchain.
    - It can't add blocks to the blockchain.
  - _Authority nodes_
    - Managed by specific organizations or communities that require trusted nodes.
    - Operate in blockchains using Proof-of-Authority, where nodes are chosen based on trust or identity verification.
  - _Staking nodes_
    - Used in Proof-of-Stake systems to validate and confirm blocks.
    - A staking node may consist of one user or a staking pool (participants collectively stake funds to increase chances of selection).
  - _Lightning nodes_
    - Creates a separate network for users to connect to off the blockchain, enabling off-chain transactions.
    - The transactions are processed and then submitted to the main blockchain.
    - Useful on congested blockchain networks with slow processing and high transaction fees.
    - Allow for low-cost, near-instantaneous transactions.

- Node responsibilities:
  - Transaction validation
  - Block propagation
  - Network consensus

### 8. Transaction Fee

In Solana, it's called rent, and in Ethereum it's gas (applicable to Ethereum post implementation of **[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)** wherein gas limits, priority fees and the discussed burn mechanism were all introduced)

1- _Gas_:
While inspecting an Ethereum transaction, two terms invariably catch the glance:

- _Transaction fee_: the amount rewarded to the block producer for processing the transaction. It is paid in Ether or GWei.
  - `Transaction fee = gasPrice * gasUsed.`
- _Gas price_: the cost per unit of gas specified for the transaction, also defined in either Ether or GWei.
  - The higher the gas price, the greater the chance of the transaction being included in a block.
- _Gas limit:_ the maximum amount of gas allowed for the transaction. This can be set by the user prior to sending a transaction.
- _Gas_: the computational effort required to execute the transaction.
- _Base gas fee:_ the minimum fee required to include a transaction in a block.
  - The fee is burnt as of EIP-1559 (the base gas fee collected from each transaction is permanently removed from circulation by being sent to an address that no one can access)
    - Burning serves to remove the value from circulation, combating inflation on the protocol -> it reduces the overall supply of Ether (ETH) -> potentially increasing its value over time (since it will become scarce).
  - The fee is dynamic, under EIP-1559, and blocks on the blockchain have a limited capacity in terms of the number of transactions they can hold.
    - If a block is more than 50% full, the `Base Gas Fee` is increased for the next block.
    - If a block is less then 50% full, the fee decreases. This serves to balance network demand and capacity.
- _Max priority fee:_ The maximum `tip` we're willing to give miners, configurable prior to sending a transaction.
- _Block confirmations:_ The number of blocks which have been mined or validated which have been confirmed to contain your transaction.

```md
Wei:  1,000,000,000 Wei  = 1 Gwei (Gigawei)
Gwei: 1,000,000,000 Gwei = 1 Eth
```

### 8. Public and Private Keys

- _Private key:_ a randomly generated secret key used to sign all transactions.
  - It's then passed through an algorithm (the **[Elliptic Curve Digital Signature Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)** for Ethereum and Bitcoin) to create the corresponding public key.

When we send a transaction to the blockchain, we're passing a private key. This allows others to verify the transaction through the generated public key.

#### -> _How does Transaction Signing Happen?_

When we sign a transaction on the blockchain, we're digitally signing some data with our private key. - The hashing algorithm used makes it impossible for something to derive your private key from a message signature.

![Signing transactions](https://updraft.cyfrin.io/blockchain-basics/08-signing-transactions/signing-transactions3.png)

This signing method allows anyone to verify the validity of a transaction by comparing the message signature to a user's public key!

> As an interesting side note, wallet addresses, like the one MetaMask provided to you, are actually derived from your public key. A public key is passed through the Ethereum Hashing Algorithm, the last 20 bytes of the resulting hash is the address!

### 9. Layer 1 and Layer 2

1- Layer 1 solutions: This refers to base layer blockchain implementations like Bitcoin or Ethereum.

- Applications directly deployed on Ethereum, like Uniswap, are not considered L2s but rather dApps on L1.

2- Layer 2 solutions: These are applications added on top of a layer one, like [Chainlink](https://chain.link/), [Arbitrum](https://arbitrum.io/) or Optimism, they're trying to solve the problem of scalability. These protocols leverage something called `rollups`.

- A **Layer 2** is any application built on outside an L1 blockchain that _hooks back into it_.
- There are different types of Layer 2:
- **Chainlink**: a decentralized Oracle networks.
- **The Graph**: event indexing networks.
- But the most popular type of L2 is the **rollup**, or **L2 chain**.
