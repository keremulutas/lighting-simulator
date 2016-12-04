var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    if(!req.app.locals.bulbCount) {
        res.redirect("/");
    }

    res.render("operation", {
        title: "Lighting Simulator - Operation",
        globalData: req.app.locals,
    });
});

router.post("/", function(req, res, next) {
    if (req.body.submit === "reset") {
        req.app.locals.bulbCount = null;
        res.redirect("/");
    }
});

module.exports = router;
