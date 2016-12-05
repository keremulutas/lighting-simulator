var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    if(req.app.locals.bulbCount) {
        res.redirect("/operation");
    }

    res.render("index", {
        title: "Lighting Simulator",
        globalData: req.app.locals,
    });
});

router.post("/", function(req, res, next) {
    if (req.body.type === "setBulbCount") {
        req.app.locals.bulbCount = req.body.bulbCount;
        req.app.locals.bulbData = {};
        for (var i=0; i < req.body.bulbCount; i++) {
            req.app.locals.bulbData["" + i] = {
                isOn: false,
                lastCommandTimestamp: 0,
            };
        }

        req.app.locals.io.emit("bulbCountSet");
        res.redirect("/operation");
    }
});

module.exports = router;
