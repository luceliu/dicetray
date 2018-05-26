// alert('dice connected');
$(document).ready(function() {
    $(".btn-roll-dice").click(function () {
        let roll = $(this).parent()[0].id.substring(1);
        roll = Number(roll);
        console.log("Rolling a d"+roll);
        let numTimes = $(this).siblings('input').val();
        if (numTimes==="") {
            rollDice(roll, 1);
        }
        else {
            rollDice(roll, Number(numTimes));
        }
        $(this).siblings('input').val(1);
        // console.log("Rolled a " + getRandomNumberUpTo(roll));
    });

    $(".decrement").click(function () {
        console.log($(this).siblings('input').val());
        let currVal = $(this).siblings('input').val()
        if (currVal > 1) {
            currVal--;
            $(this).siblings('input').val(currVal);
        }
    });

    $(".increment").click(function () {
        let currVal = $(this).siblings('input').val();
        currVal++;
        $(this).siblings('input').val(currVal);
    });

});

function rollDice(d, times) {
    let i;
    for (i=0; i < times; i++) {
        console.log(getRandomNumberUpTo(d));
    }
}

function getRandomNumberUpTo(number) {
    return Math.floor((Math.random() * number) + 1);
}