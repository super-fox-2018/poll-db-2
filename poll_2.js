const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./poll_db_2.db');


database.all(`SELECT name, location, grade_current, COUNT(*) AS total_vote
FROM politicians JOIN votes ON votes.politicians_id = politicians.id
WHERE politicians.grade_current < 9 GROUP BY grade_current
ORDER BY grade_current ASC
`,(err,row)=>{
  if(err) throw err;
  console.log(row);
  console.log("1-----------------------------------------------");
})

database.all(`SELECT COUNT(*) AS total_vote,
(voters.first_name || ' ' || voters.last_name) AS name_voters,
voters.gender, voters.age FROM voters INNER JOIN votes ON voters.id = votes.voters_id
GROUP BY voters.id HAVING total_vote > 1 ORDER BY 1 DESC`,(err,row)=>{
  if(err) throw err;
  console.log(row);
  console.log("3-----------------------------------------------");
})
