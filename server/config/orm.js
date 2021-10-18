// Import MySQL connection.
const connection = require("../config/connection.js");

// helper function for SQL syntax
function prepareValuesForQuery(vals) {
    let arr = [];

    for (let i = 0; i < vals.length-1; i++) {
        tempString = "\'" + vals[i] + "\'";
        arr.push(tempString);
        arr.push(false);
    }

    console.log("Prepared values for query",arr.toString());
    return arr.toString();
};

//helper function to convert object key/value paris to SQL syntax
function objToSql(ob) {
    let arr = [];

    for (let key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
};

// object for all SQL statement functions
let orm = {
    all: (tableInput, cb) => {
        const queryString = "SELECT * FROM " + tableInput + ";";

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: (table, cols, vals, cb) => {

        console.log("Values",vals[0]);
        console.log("Columns",cols);

        // let queryString ="INSERT INTO " + table;

        // queryString += " (";
        // queryString += cols;
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += prepareValuesForQuery(vals);
        // queryString += "); ";

        // let queryString = "INSERT INTO burger(burger_name, devoured)  VALUES ($1);";


        //console.log(queryString);

        //text: 'INSERT INTO burger(burger_name, devoured)  VALUES ($1, $2);', values: ['cheese', false]

        connection.query({text: 'INSERT INTO burger(burger_name, devoured)  VALUES ($1, $2);', values: vals}, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    update: (table, objColVals, condition, cb) => {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

// Export the ORM object for the model
module.exports = orm;
