var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dicetray', (err) => {
    if (err) {
        console.log(err);
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.send("yoooo");
});

app.get("/characters", function(req, res){
    Character.find({}, (err, characters) => {
        if (err) {
            console.log(err);
        } else {
            res.render("characters",{characters:characters});
        }
    });
});

app.post("/characters", function(req, res){
    // get data from form and add
    console.log(req.body);
    Character.create({
        _id: new mongoose.Types.ObjectId(),
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma
    }, (err, character) => {
        if (err) {
            console.log(err);
        } else {
            console.log(character);
        }
        res.redirect("/characters");
    });

    // Attributes.create({
    //     strength: req.body.strength,
    //     dexterity: req.body.dexterity,
    //     constitution: req.body.constitution,
    //     intelligence: req.body.intelligence,
    //     wisdom: req.body.wisdom,
    //     charisma: req.body.charisma
    // }, (err, attribute) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //         console.log(attribute);
    //
    //         Character.create({
    //             _id: new mongoose.Types.ObjectId(),
    //             attributes: attribute
    //         }, (err, character) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("Success");
    //                 console.log(character);
    //                 res.redirect("/characters");
    //             }
    //         })
    //     }
    // });
});

app.get("/characters/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("The Dicetray Server Has Started!");
});

//Schemas
let Schema = mongoose.Schema;

// let AttributesSchema = new Schema({
//     strength:Number,
//     dexterity:Number,
//     constitution:Number,
//     intelligence:Number,
//     wisdom:Number,
//     charisma:Number,
// });
//
// let Attributes = mongoose.model("Attributes", AttributesSchema);

let CharacterSchema = new Schema({
    _id:Schema.Types.ObjectId,
    strength:Number,
    dexterity:Number,
    constitution:Number,
    intelligence:Number,
    wisdom:Number,
    charisma:Number,
});

let Character = mongoose.model("Character", CharacterSchema);