var express = require("express");

var router = express.Router();

router.ws("/echo", function(ws, req) {
    ws.on("message", function(msg) {
        console.log("İŞTE İŞTE İŞTE:", msg);
        ws.send(msg);
    });
});

module.exports = router;
