$(document).ready(function() {
$("#start-screen__characters").click(function () {
    console.log('clicked');
    window.location.href = "/characters";
});

    $("#start-screen__dice").click(function () {
        console.log('clicked');
        window.location.href = "/dice";
    });
});