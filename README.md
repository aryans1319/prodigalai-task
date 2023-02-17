# prodigalai-task

Task Given: 

- Extract Data from: https://www.uniswap.shippooor.xyz/ For Ethereum chain and Swaps Dataset.
- Store the data in Postgres DB
- Create a Page with Table to show this data
- Fetch the same data for future events to track live occurrences via UniswapV3 subgraph:https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3
- Update the data in DB and Live Chart based on the updates in the graph

## Breakdown of the problem from my understanding

- Set up a React project with the necessary dependencies (such as Axios and Chart.js) to make API calls and display charts.
- Set up a Node and Express server to handle requests to and from the React client and the PostgreSQL database.
- Create a PostgreSQL database and set up a schema to store the data.
- Write scripts to scrape data from https://www.uniswap.shippooor.xyz/ and store it in the PostgreSQL database.
- Create a page in the React client that displays the data from the PostgreSQL database in a table format.
- Set up a GraphQL API to fetch data from the UniswapV3 subgraph and subscribe to updates.
- Write scripts to update the PostgreSQL database with the new data and update the charts in the React client based on the updates.