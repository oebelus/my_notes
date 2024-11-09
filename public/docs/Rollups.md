They are L2 scaling solutions that enable to increase the number of transactions on Ethereum by bundling multiple transactions into one, reducing gas costs.

![Rollups](https://updraft.cyfrin.io/blockchain-basics/15-l1s-l2s-and-rollups/tx-bundle.png)

Rollups help solve the blockchain trilemma, which states that a blockchain can only achieve two out of three properties:

- _decentralization_
- _security_
- _scalability_
  In the case of Ethereum, **scalability** is sacrificed as it can only process approximately 15 transactions per second. Rollups, on the other hand, aim to enhance scalability without compromising security or decentralization.

### **_How Rollups Work?_**

1- A user [submits a transaction](https://docs.zksync.io/zk-stack/concepts/transaction-lifecycle) to a rollup 2. An **operator** (a node or entity responsible for processing transactions) picks it up, bundles it with other transactions, compresses them, and submits the batch back to the L1 blockchain.

There are two types of rollups, Optimistic and Zero-Knowledge rollups. The main difference between the two lies in how each rollup verifies the validity of the transactions.

### **_Optimistic Rollups:_**

- _Overview:_
  \- They assume that off-chain transactions are _valid by default_ and process them off-chain to improve scalability.
  \- Operators propose the **valid state** of the rollup chain, which includes a batch of off-chain transactions.

- _Challenge period:_
  \- After each proposed state, there is a **challenge period** during which other operators can dispute potentially fraudulent transactions.
  \- If an operator suspects fraud, they can initiate a **fraud proof** to challenge the validity of the state.

- _Fraud and Process:_
  \- The fraud proof involves a **call-and-response interaction** between the challenging operator and the original operator who submitted the transaction.
  \- They work together to isolate the specific computational step where fraud is suspected.
  \- This disputed step is then executed on the **Layer 1 blockchain** (e.g., Ethereum), allowing for verification: - If the Layer 1 execution produces a different result than the original rollup state, it confirms the transaction as fraudulent.

- _Penalties of Fraud:_
  \- If the fraud proof is successful, the rollup re-executes the entire batch of transactions correctly.
  \- The operator responsible for the incorrect transaction is **penalized**, often through **slashing** (losing staked tokens).

### **_ZK Rollups:_**

- ZK rollups use validity proofs, known as _ZK proofs_, to verify transaction batches.
- In this process:
  - The **prover** (operator) generates a ZK proof to show that their inputs (the transactions) satisfy this equation.
  - A **verifier** (an L1 contract) then checks this proof to ensure that the output matches the expected result.
  - The solution that the prover uses to demonstrate that their input satisfies the mathematical equation in the ZK proof is commonly referred as the **witness**.

### **_Centralized Sequencers_**

- In blockchain and cryptocurrency networks, the role of a **sequencer** is crucial for ordering and bundling transactions.
- Sequencers are operators that are responsible for organizing how transactions are processed. In many roll-up solutions, sequencers are centralized, controlled by a single entity.

To mitigate the issues associated with centralized sequencers, projects like **zkSync** are working towards _decentralizing_ their sequencer operations, distributing control among multiple entities or nodes.

### **_L2 Rollup Stages_**

**Layer 2 (L2) Chain Maturity**: L2 chains are assessed based on specific properties and categorized into stages. The [L2B](https://l2beat.com/scaling/summary) team provides an opinionated assessment to encourage greater decentralization.

#### **Rollup Stages:**

0- **Stage 0:**

- Governance: Controlled by operators and a security council, ensuring that critical decisions and actions are overseen by a _trusted group_.
- Transparency: Open-source software allows reconstruction of state from Layer 1 (L1) data.
- Exit Mechanism: Users can exit the rollup within seven days, but it often requires action from an operator.

1- **Stage 1:**

- Governance: Managed by smart contracts, with the security council still playing a role (e.g., solving bugs).
- Proof System: Fully functional, enabling decentralized submission of validity proofs.
- Exit Mechanism: Improved to allow independent user exits without operator coordination.

2- **Stage 2:**

- Governance: Fully decentralized and managed by smart contracts.
- Proof System: Permissionless, enabling decentralized verification of transactions.
- Exit Mechanism: Fully decentralized, with no need for operator involvement.
- Security Council: Limited to addressing errors on-chain but not involved in day-to-day operations.

![The actual stage of each rollup](https://updraft.cyfrin.io/blockchain-basics/17-rollup-stages/l2beat-summary.png)

### **ZKSync Risk Analysis**

#### **Current Stage:**

- ZKSync Era is currently operating as a **Stage 0** rollup.

#### **Risk Factors in ZKSync:**

1- **Data Availability:**

- Ensures the ability to reconstruct the L2 state from L1 data.
- Allows anyone to verify and rebuild the L2 state when necessary.

2- **State Validation:**

- Ensures legitimacy of bundled transactions.
- For ZKSync, state validation is done using **PLONK** (Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge), a zero-knowledge proof algorithm.

3- **Sequencer Failure:**

- Describes processing transactions even if the sequencer (transaction orderer) is down.
- In ZKSync, transactions can still be submitted to L1, though they may not be enforced immediately.

> **Note:** The sequencer is the operator responsible for ordering and batching user transactions before committing them to Layer 1.

4- **Proposer Failure:**

- Describes the ability to process transactions even if the proposer (who submits the batch of transactions) is down.
- ZKSync will halt all withdrawals and transaction executions if the proposer fails.

5- **Exit Window:**

- Currently, ZKSync does not have an exit window during unwanted upgrades.
