var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", {
        title: "Lighting Simulator",
        bulbCount: req.app.locals.bulbCount,
    });
});

router.post("/", function(req, res, next) {
    if (req.body.submit === "submit") {
        req.app.locals.bulbCount = req.body.bulbCount;
    } else if (req.body.submit === "reset") {
        req.app.locals.bulbCount = null;
    }

    res.render("index", {
        title: "Lighting Simulator",
        bulbCount: req.app.locals.bulbCount,
    });
});

module.exports = router;
