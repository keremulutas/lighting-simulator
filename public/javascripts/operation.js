$(document).ready(function() {
    $(".bulb").on("click", function(evt) {
        var elem = $(evt.target);
        var bulbId = elem.data("bulb-id");
        var isOn = elem.hasClass("bulb-on");
        var reqCmd = (isOn) ? "turnBulbOff" : "turnBulbOn";

        if(elem.find(".countdown").hasClass("hidden")) {
            $.ajax({
                type: "POST",
                data: {
                    type: "operationRequest",
                    bulbId: bulbId,
                    cmd: reqCmd,
                },
            });
        }
    });
});
