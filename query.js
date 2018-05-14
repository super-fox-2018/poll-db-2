const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./PollDB.db');

// answer no. 1
let satu =
  `SELECT name, locations, grade_current,
        COUNT (*) AS totalVote FROM Politician
         JOIN
        DataVoters ON DataVoters.id_politician = politician.ID
        WHERE
        politician.grade_current < 9
        GROUP BY name
        ORDER BY grade_current ASC`

//dua

//answer no 3
let tiga = `SELECT COUNT(*) as 'totalVote', Voters.first_name || ' ' || Voters.last_name as 'name',
gender, age FROM Voters JOIN DataVoters ON DataVoters.id_voters = Voters.ID GROUP BY
DataVoters.id_voters HAVING totalVote > 1 ORDER BY totalVote DESC;
`


let data = [satu, tiga]

for (let i = 0; i < data.length; i++) {
  db.all(data[i], function(err, rows) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    console.log('--------------------------------')
  });

}
