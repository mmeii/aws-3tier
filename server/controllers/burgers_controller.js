// import dependencies
const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

//Create the router for the app
router.get("/", (req, res) => {
    burger.all((data) => {
        //console.log("data",data);
        let hbsObject = {
            burgers: data.rows
        };
        console.log("hbsObject",data.rows);
        res.render('index', hbsObject);
    });
});

router.post("/api/burgers/", (req, res) => {
    burger.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        (result) => {
            res.json({ id: result.id });
        }
    );
});

router.put("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log("req", req);
    console.log("res", res);

    burger.update(
        { devoured: req.body.devoured },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

router.delete("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    burger.delete(condition, (result) => {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//export the route
module.exports = router;