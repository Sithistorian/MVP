const express = require('express');
const app = express();
const port = 3000;
const db = require('./heroDB');

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})

const getDerivedStats = function (attributes, skills, character) {

  let result = {Pace: 6};

  result.Parry = `${2 + (parseInt(skills.Fighting.substring(1)))/2} (${character.ParryModifier})`

  result.Toughness = `${2 + (parseInt(attributes.Vigor.substring(1)))/2} (${character.armor})`

  return result;
}

const shapeSkills = function (skills) {
  let result = {};

  for (let i = 0; i < skills.length; i++) {
      result[skills[i].skillName] = skills[i].skilllevel;
  }
  return result;
}

const shapeAttributes = function (attributes) {
  let result = {};

  for (let i = 0; i < attributes.length; i++) {
      result[attributes[i].name] = attributes[i].attlevel;
  }
  return result;
}

app.get('/Characters/', (req, res) => {

db.getCharacter(req.query.name, (err, character) => {
  if(err) {
    console.error(err);
  } else {
    db.getAttributes(req.query.name, (err, attributes) => {
      if (err){
        console.error(err);
      } else {
        db.getSkills(req.query.name, (err, skills) => {
          if (err) {
            console.error(err);
          } else {
            attributes = shapeAttributes(attributes);
            skills = shapeSkills(skills);
            character = character[0];
            character.derivedStats = getDerivedStats(attributes, skills, character);
            character.skills = skills;
            character.attributes = attributes;
            res.status(200).send(character);
          }
        })
      }
    })
  }
})



})