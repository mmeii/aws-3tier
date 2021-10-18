// Set up postgre connection to aws.
const { Client } = require("pg");

const client = new Client({
    // user: 'postgres',
    // host: 'bhuvana-mei-3tier.ch1ywcw8giyd.us-east-1.rds.amazonaws.com',
    // database: 'ToDoList',
    // password: '3tierbhuvanamei',
    // port: 5432,
    user: 'postgres',
    host: 'localhost',
    database: 'todolist',
    password: null,
    port: 5432,
  })
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Export connection for our ORM to use.
module.exports = client;
