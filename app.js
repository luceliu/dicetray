let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/dicetray', (err) => {
    if (err) {
        console.log(err);
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
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

app.get('/character/id/:id', function (req, res) {
    console.log('_id: ' + req.params.id);
    Character.find({_id: req.params.id}, (err, character) => {
        if (err) {
            console.log(err);
            res.send("Unknown character: " + req.params.id);
            res.redirect("/characters");
        } else {
            // res.send(character);
            console.log("Found character: " + req.params.id);
            console.log(character);
            res.render("character", {character:character});
        }
    })
});

app.put('/character/id/:id', (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body.character, (err, updated) => {
        if (err) {
            console.log(err);
            res.redirect("/characters");
        } else {
            console.log("updated");
            console.log(updated);
            res.redirect("/character/id/"+req.params.id);
        }
    });
});

app.get('/character/id/:id/edit', function (req, res) {
    console.log("Editing: " + req.params.id);
    Character.find({_id: req.params.id}, (err, character) => {
        if (err) {
            console.log(err);
            res.send("Unknown character: " + req.params.id);
            res.redirect("/characters");
        } else {
            // res.send(character);
            console.log("Found character: " + req.params.id);
            console.log(character);
            res.render("editcharacter", {character:character});
        }
    })
});

app.post("/characters", function(req, res){
    // get data from form and add
    console.log(req.body);
    Character.create({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
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
});

app.delete('/character/id/:id', function (req, res) {
    Character.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
            res.redirect("/characters");
        }
    });
});

app.get("/characters/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("The Dicetray Server Has Started!");
});

//Schemas
let Schema = mongoose.Schema;

let CharacterSchema = new Schema({
    _id:Schema.Types.ObjectId,
    name:String,
    strength:Number,
    dexterity:Number,
    constitution:Number,
    intelligence:Number,
    wisdom:Number,
    charisma:Number,
});

let Character = mongoose.model("Character", CharacterSchema);

//Character functions
function getModifiers(character)
{
    let modifiers = [
        strength => null,
        dexterity => null,
        constitution => null,
        intelligence => null,
        wisdom => null,
        charisma => null,
    ];
    if (character instanceof Character) {
        let i = 0;
        getAttributes(character).forEach((attribute) => {
            modifiers[i] = calculateModifier(attribute);
            i++;
        })
    } else {
        return null;
        //TODO throw dat red hot exception
    }
}

function getAttributes(character)
{
    let attributes = [];
    attributes.push(character.strength);
    attributes.push(character.dexterity);
    attributes.push(character.constitution);
    attributes.push(character.intelligence);
    attributes.push(character.wisdom);
    attributes.push(character.charisma);

    return attributes;
}

/**
 * @param attribute
 * @returns {number}
 */
function calculateModifier(attribute)
{
    switch (attribute) {
        case 1:
            return -5;
            break;
        case 2:
        case 3:
            return -4;
            break;
        case 4:
        case 5:
            return -3;
            break;
        case 6:
        case 7:
            return -2;
            break;
        case 8:
        case 9:
            return -1;
            break;
        case 10:
        case 11:
            return 0;
            break;
        case 12:
        case 13:
            return 1;
            break;
        case 14:
        case 15:
            return 2;
            break;
        case 16:
        case 17:
            return 3;
            break;
        case 18:
        case 19:
            return 4;
            break;
        case 20:
        case 21:
            return 5;
            break;
        case 22:
        case 23:
            return 6;
            break;
        case 24:
        case 25:
            return 7;
            break;
        case 26:
        case 27:
            return 8;
            break;
        case 28:
        case 29:
            return 9;
            break;
        case 30:
            return 10;
            break;
    }
}