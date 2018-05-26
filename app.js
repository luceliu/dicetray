var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let characters = [
    {strength: 12, dexterity: 15, constitution:10, intelligence: 9, wisdom: 16, charisma: 18}
];

app.get("/", function(req, res){
    res.send("yoooo");
});

app.get("/characters", function(req, res){
    res.render("characters",{characters:characters});
});

app.post("/characters", function(req, res){
    // get data from form and add to campgrounds array
    let attributes = new Attributes(
        req.body.strength,
        req.body.dexterity,
        req.body.constitution,
        req.body.intelligence,
        req.body.wisdom,
        req.body.charisma
    );
    let newCharacter = new Character(attributes);
    newCharacter.save(function (err) {
        if (err) {
            console.log(err + "fuck");
        }
    });
    characters.push(newCharacter);
    //redirect back to characters page
    res.redirect("/characters");
});

app.get("/characters/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("The Dicetray Server Has Started!");
});

function Attributes(strength, dexterity, constitution, intelligence, wisdom, charisma)
{
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
}

function Character(attributes)
{
    this.attributes = attributes;
}