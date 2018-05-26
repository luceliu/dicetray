// alert('dice connected');
$(document).ready(function() {
    $(".btn-roll-dice").click(function () {
        let roll = $(this).parent()[0].id.substring(1);
        roll = Number(roll);
        console.log(roll);
        console.log("Rolled a " + getRandomNumberUpTo(roll));
    });

});

function getRandomNumberUpTo(number) {
    return Math.floor((Math.random() * number) + 1);
}