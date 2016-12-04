var express = require("express");
var app = express();

app.port = 3000;

app.get("/", function(req, res) {
    console.log(req, res);
    res.send("Hello World!");
});

app.listen(app.port, function() {
    console.log("Home automation - lighting simulator started. [port=" + app.port + "]");
});
