// alert('dice connected');
$(document).ready(function() {
    let players = []; // array of player objects
    let activePlayer; // whoever's rolling at the time

    /* BUTTONS */
    $(".btn-roll-dice").click(function () {
        let roll = $(this).parent()[0].id.substring(1);
        roll = Number(roll);
        console.log("Date: "+ Date.now());
        let numTimes = $(this).siblings('input').val();
        console.log("numTimes: "+numTimes);
        if (numTimes==="") {
            rollDice(roll, 1);
        }
        else {
            rollDice(roll, Number(numTimes));
        }
        $(this).siblings('input').val(1);
    });

    $(".decrement").click(function () {
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

    $(".players__btn").click(function () {
        console.log('click'); // todo what's up with this not firing
    });

    $("#history__clear-btn").click(function () {
       // clear
        console.log($("#roll-history"));
        $("#roll-history")[0].textContent = '';
    });

    $("#players__new-btn").click(function () {
        if (canAddMorePlayers(players.length)) {
            console.log("Players[]: " + players);
            let playerIndex = players.length+1;
            let newPlayer = {
                playerId: playerIndex,
                playerName: "Player "+playerIndex,
                // TODO: add colours
            };
            players.push(newPlayer);
            console.log("Players[]: " + players);
            $("#players").append("<button type='button' class='btn players__btn'>"+newPlayer.playerName+"</button>");
        }

    });

});

/* FUNCTIONS */
function rollDice(d, times) {
    let i;
    let results = [];
    for (i=0; i < times; i++) {
        results.push(getRandomNumberUpTo(d));
    }
    $("#roll-history").append("["+timeStamp()+"] Rolled a d" + d +" and got: ");
    for (i = 0; i < results.length; i++) {
        if (i === results.length-1) {
            $("#roll-history").append(results[i]+".");
        }
        else {
            $("#roll-history").append(results[i] + ", ");
        }
    }
    $("#roll-history").append(" ("+times+" rolls) \n");
}

function getRandomNumberUpTo(number) {
    return Math.floor((Math.random() * number) + 1);
}

function canAddMorePlayers(currentNum) {
    return currentNum < 8;
}
// ----------------------------------------------------------------------------------------------
// thanks https://gist.github.com/hurjas/2660489
function timeStamp() {
// Create a date object with the current time
    var now = new Date();

// Create an array with the current month, day and time
//     var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
    time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }

// Return the formatted string
    return time.join(":") + " " + suffix;
}