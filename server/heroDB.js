let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'Heros'
})

connection.connect()

const getSkills = function (name, callback) {

  let queryString = `SELECT skillName, skilllevel FROM Characters INNER JOIN Skills INNER JOIN CharacterSkills WHERE Characters.name = ? AND Skills.id = CharacterSkills.skillID`

  connection.query(queryString, [name], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

const getAttributes = function (name, callback) {

  let queryString = `SELECT Attributes.name, attlevel FROM Characters INNER JOIN Attributes INNER JOIN CharacterAttributes WHERE Characters.name = ? AND Attributes.id = CharacterAttributes.attributeID`

  connection.query(queryString, [name], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })

}

const getCharacter = function (name, callback) {

  let queryString = `SELECT * FROM Characters WHERE name = ?`

  connection.query(queryString, [name], (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}



// getSkills('Saphire', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data);
//   }
// })

// getAttributes('Saphire', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data);
//   }
// })

// getCharacter('Saphire', (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data);
//     }
//   })

module.exports = {
  getSkills,
  getAttributes,
  getCharacter
}