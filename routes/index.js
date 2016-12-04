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
    if (req.body.submit === "submit") {
        req.app.locals.bulbCount = req.body.bulbCount;
        res.redirect("/operation");
    }
});

module.exports = router;
