var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');


class ShowData {
  static dataPolitician() {
    let showDataPolitician = `SELECT * FROM politicians`
    db.all(showDataPolitician, (err, res) => {
      console.log(res);
    })
  }
}

class Release0 {
  static soalSatu() {
    let soalSatu = `SELECT politicians.name,politicians.location,politicians.grade_current,count(*) AS totalVote
      FROM politicians
      JOIN votes
      ON votes.id = politicians.id
      WHERE politicians.grade_current < 9
      GROUP BY politicians.name
      ORDER BY politicians.name DESC`
    db.all(soalSatu, (err, res) => {
      console.log(res);
    })
  }
}

class Release0Kedua {
  static soalDua() {
    let soalKedua = `SELECT totalVote ,politicianTable.politicianName, first_name ||' '|| last_name AS voterName , gender FROM votes
      JOIN politicianTable ON politicianTable.id = votes.politicianId
      JOIN voters ON votes.id = voters.id
      ORDER BY politicianTable.politicianName DESC`
    db.all(soalKedua, (err, res) => {
      if (err) {
        throw err
      }
      console.log(res);
    })
  }
}

class Release0Ketiga {
  static soalTiga() {
    let soalKetiga = `SELECT count(*) AS totalVote,voters.first_name||' '|| voters.last_name AS name,gender,age
      FROM votes JOIN voters
      ON votes.voterId = voters.id
      GROUP BY name
      HAVING  totalVote > 1
      ORDER BY totalVote  DESC`
      db.all(soalKetiga,(err,res)=>{
        console.log(res);
      })
  }
}

// ShowData.dataPolitician()
// Release0.soalSatu()
// Release0Kedua.soalDua()
Release0Ketiga.soalTiga()
