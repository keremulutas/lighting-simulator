var wsHandler;

var createSocket = function() {
    wsHandler = io(location.host);

    wsHandler.on("bulbCountSet", function(msg) {
        if (location.pathname === "/") {
            location.pathname = "/operation";
        }
    });

    wsHandler.on("applicationReset", function(msg) {
        if (location.pathname === "/operation") {
            location.pathname = "/";
        }
    });

    wsHandler.on("bulbToggled", function(msg) {
        console.error("bulbToggled", msg);
        if(msg.result === "success") {
            var elem = $("div.bulb[data-bulb-id='" + msg.bulbId + "']");
            elem.toggleClass("bulb-off", !msg.isOn).toggleClass("bulb-on", msg.isOn);
            elem.find(".countdown").removeClass("hidden");
            setTimeout(function() {
                elem.find(".countdown").addClass("hidden");
            }, 5000);
        } else {
            console.error(msg.error);
        }
    })
};

$(document).ready(function() {
    createSocket();
});
