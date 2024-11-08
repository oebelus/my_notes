Let's take Ethereum as an example. It has four important perks:

1- Blockchain

2- Smart Contracts

3- EVM - the middleman between Solidity and State changes

4- Frontend

#### _The architecture:_

The architecture of a Decentralized Application (DApp) like Ethereum consists of multiple components that work together to provide a decentralized solution.

1- User 2. Web Browser

- A signer, and it's generally a browser extension, like MetaMask.

3. Frontend: it interacts with the Ethereum blockchain through a provider.
   - In most cases, we don't want to put the assets on the blockchain since it might be too costy, we can handle it through a decentralized structure like IPFS that will use the Provider and connect it to the frontend.
4. Provider: Since a DApp's frontend cannot directly connect to the blockchain, it relies on a provider (MetaMask, Infura, Alchemy...) that acts as a bridge between the frontend and the Ethereum blockchain. It allows the frontend to send transactions, sign requests, and query blockchain data.
5. Ethereum Blockchain: it provides the security and immutability for all records. The Ethereum blockchain contains multiple critical components:
   - **Blocks**: Grouped sets of transactions that are linked together in a chain.
   - **Nodes**: Decentralized machines that validate and propagate transactions and smart contracts.
   - **Consensus Mechanism (Proof of Stake)**: Ensures that transactions are legitimate and that all nodes have a consistent view of the blockchain state.
6. [[Smart Contracts]]
7. [[EVM]], it handles:
   - Executing the code for smart contracts
   - Determining the new state of the blockchain after contract execution
   - Processing gas (transaction fees)
8. Layer 2 solutions for scalability (Polygon, ZK rollups), built on top of the Ethereum blockchain to enhance scalability. They connect to both the Ethereum blockchain and the frontend, reducing congestion and transaction costs.

##### Overview

```
User -> Web Browser -> Frontend -> Provider (MetaMask/Infura/Alchemy) -> Ethereum Blockchain        |
							--------------
		---------------------             |
		|   Smart Contracts  |            |
		|   Ethereum Virtual |<------ Layer 2
		|      Machine (EVM) |
		---------------------

```

- **User** interacts with the DApp through their web browser.
- **Frontend** displays the user interface and handles user input.
- **Provider** connects the frontend to the Ethereum blockchain, enabling transactions and data retrieval.
- **Smart Contracts** execute the logic defined by the DApp on the blockchain.
- **EVM** processes the contract execution and ensures the integrity of the blockchain's state changes.
- **Layer 2 Solutions**: Increase scalability and decrease transaction costs, improving the overall user experience.

All in all:

```
Frontend <--> Blockchain
```

The blockchain acts as the backend and the database of the application.

#### _Benefits of dApps_

1- Protecting the inner data and not presenting it to a 3rd party since they can't process it.

- _Encrypted personal information:_
  - A decentralized identity platform can verify your identity without sharing personal data. Only a proof of identity is shared, confirming you meet certain conditions without exposing your information.
- _IPFS (InterPlanetary File System):_ - Files are stored on IPFS (decentralized file storage), with a unique hash stored on the blockchain to verify file integrity. The file content remains private, accessible only to the user or authorized parties through the IPFS network.
  1- Trustless Transactions.
- _Sending Cryptocurrency_.
- _Smart Contract Execution_.
  1- Innovation and Diversity.
- DeFi
  - _Lending and Borrowing Platforms:_
    - Platforms like Aave and Compound let users lend and borrow assets directly, with smart contracts managing the process and interest rates set by supply and demand.
  - _Decentralized Exchanges (DEXs)_:
    - Uniswap and SushiSwap allow users to swap tokens directly from their wallets, without relying on a centralized authority to hold their funds.
- Gambling
  - _Decentralized Casinos_:
    - Platforms like FunFair and Etheroll operate on smart contracts, enabling players to place bets, play games, and claim winnings without a third party.
  - _Provably Fair Games:_
    - Gambling platforms use blockchain to verify the fairness of games. Players can audit results, such as dice rolls or card deals, through blockchain algorithms, ensuring transparency without trusting the casino.
- Gaming
  - _Play-to-Earn (P2E) Games:_
    - Games like Axie Infinity and The Sandbox allow players to earn cryptocurrency, NFTs, or assets. In-game assets can be traded, and ownership is verified on the blockchain.
  - _NFT-based Games:_
    - In Decentraland, players can buy, sell, and trade virtual land as NFTs, with ownership and transactions recorded on the blockchain for a transparent in-game economy.
- Metaverse:
  - _Decentralized Virtual Worlds:_
    - Platforms like Decentraland and Somnium Space allow users to buy land, build structures, and interact, all secured by blockchain technology. Ownership and transactions are recorded on the blockchain.
  - _Virtual Goods & NFTs:_
    - NFTs represent unique virtual assets like clothing or art that can be bought, sold, or traded across metaverse platforms, with blockchain ensuring authenticity and scarcity.
- Crowdfunding (a method of raising money or capital from a large number of people, to fund a project, business, or cause)
  - _Initial Coin Offerings (ICOs) and Token Sales:_
    - ICOs and IDOs enable projects to raise funds through token sales. These decentralized processes ensure transparency, with blockchain tracking fund usage.
  - _Decentralized Autonomous Organizations (DAOs):_
    - DAOs enable decentralized crowdfunding, where community members vote on fund allocation via governance tokens, giving holders a say in project decision-making.
