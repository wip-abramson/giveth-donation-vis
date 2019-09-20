## This is a clone of the [eth-denver](https://github.com/graphprotocol/ethdenver-dapp) stater dapp for the graph meant to be used with the [Giveth donation subgraph](https://thegraph.com/explorer/subgraph/geleeroyale/giveth-donation)


## Getting started

All you need to do is connect it with the donation subgraph

#### Connect this dApp to the subgraph

1. Write the the GraphQL endpoint of our subgraph to `.env` in this directory:
   ```sh
   echo "REACT_APP_GRAPHQL_ENDPOINT=https://api.thegraph.com/subgraphs/name/geleeroyale/giveth-donation > .env
   ```
2. Then, start this app:
   ```sh
   yarn install
   yarn start
   ```
