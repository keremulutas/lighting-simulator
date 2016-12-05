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
    if (req.body.type === "resetApplication") {
        req.app.locals.bulbCount = null;
        req.app.locals.bulbData = null;
        res.redirect("/");
        req.app.locals.io.emit("applicationReset");
    } else if (req.body.type === "operationRequest") {
        var ts = + new Date();

        var responseData = {
            type: "operationResponse",
            bulbId: req.body.bulbId,
        };

        if (req.app.locals.bulbCount === null) {
            responseData.result = "error";
            responseData.error = "Bulb count is not set yet.";
        } else if (ts - req.app.locals.bulbData[req.body.bulbId].lastCommandTimestamp > 5000) {
            if (req.body.cmd === "turnBulbOff") {
                if(req.app.locals.bulbData[req.body.bulbId].isOn) {
                    console.warn("turnBulbOff req:", typeof req.body.bulbId, req.app.locals.bulbData[req.body.bulbId], ts - req.app.locals.bulbData[req.body.bulbId].lastCommandTimestamp > 5000);
                    req.app.locals.bulbData[req.body.bulbId].isOn = false;
                    req.app.locals.bulbData[req.body.bulbId].lastCommandTimestamp = ts;
                    responseData.isOn = false;
                    responseData.result = "success";
                } else {
                    responseData.result = "error";
                    responseData.error = "Bulb [id=" + req.body.bulbId + "] is already off.";
                }
            } else if (req.body.cmd === "turnBulbOn") {
                if (!req.app.locals.bulbData[req.body.bulbId].isOn) {
                    console.warn("turnBulbOn req:", typeof req.body.bulbId, req.app.locals.bulbData[req.body.bulbId], ts - req.app.locals.bulbData[req.body.bulbId].lastCommandTimestamp > 5000);
                    req.app.locals.bulbData[req.body.bulbId].isOn = true;
                    req.app.locals.bulbData[req.body.bulbId].lastCommandTimestamp = ts;
                    responseData.isOn = true;
                    responseData.result = "success";
                } else {
                    responseData.result = "error";
                    responseData.error = "Bulb [id=" + req.body.bulbId + "] is already on.";
                }
            } else {
                responseData.result = "error";
                responseData.error = "Unhandled operation request.";
            }
        } else {
            responseData.result = "error";
            responseData.error = "You can not toggle the bulb within 5 seconds from last command";
        }

        req.app.locals.io.emit("bulbToggled", responseData);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(responseData));
    }
});

module.exports = router;
