// import orm to create functions that will interact with the db
const orm = require("../config/orm.js");

const burger = {
    all: (cb) => {
        orm.all("burger", (res) => {
            cb(res);
        });
    },
    create: (cols, vals, cb) => {
        orm.create("burger", cols, vals, (res) => {
            cb(res);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.update("burger", objColVals, condition, (res) => {
            cb(res);
        });
    },
    delete: (condition, cb) => {
        orm.delete("burger", condition, (res) => {
            cb(res);
        });
    }
};

//export the db functions for the controller
module.exports = burger;