const express = require("express");
const { request, gql } = require("graphql-request");
const { Pool } = require("pg");

const app = express();

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: "aryan",
  host: "localhost",
  database: "swap_db",
  password: "131902",
  port: 5432, // default PostgreSQL port
});

// GraphQL query to fetch the swaps data from the Uniswap V3 subgraph
const query = gql`
  {
    swaps(skip: 0, first: 1000) {
      id
      transaction {
        id
      }
      timestamp
      pool {
        id
      }
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      sender
      recipient
      origin
      amount0
      amount1
      amountUSD
      sqrtPriceX96
      tick
      logIndex
    }
  }
`;

// Handler to fetch the swaps data from the subgraph and store it in PostgreSQL
app.get("/storeSwapsData", async (req, res) => {
  try {
    // Fetch the swaps data from the subgraph
    const { swaps } = await request(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      query
    );

    // Open a client connection to the PostgreSQL pool
    const client = await pool.connect();

    try {
      // Loop over the swaps and insert them into the "swaps" table in PostgreSQL
      for (const swap of swaps) {
        const {
          id,
          transaction,
          timestamp,
          pool,
          token0,
          token1,
          sender,
          recipient,
          origin,
          amount0,
          amount1,
          amountUSD,
          sqrtPriceX96,
          tick,
          logIndex,
        } = swap;

        const queryString = `
          INSERT INTO swaps(id, transaction_id, timestamp, pool_id, token0_id, token0_symbol, token1_id, token1_symbol, sender, recipient, origin, amount0, amount1, amount_usd, sqrt_price_x96, tick, log_index)
          VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        `;

        const queryValues = [
          id,
          transaction.id,
          timestamp,
          pool.id,
          token0.id,
          token0.symbol,
          token1.id,
          token1.symbol,
          sender,
          recipient,
          origin,
          amount0,
          amount1,
          amountUSD,
          sqrtPriceX96,
          tick,
          logIndex,
        ];

        await client.query(queryString, queryValues);
      }

      res.send("Swaps data stored in PostgreSQL!");
    } finally {
      // Release the client connection
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to store swaps data in PostgreSQL.");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
