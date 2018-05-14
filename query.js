const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./poll.db');

let query1 = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(*) AS totalVote
FROM politicians
INNER JOIN votes ON votes.politician_id = politicians.politician_id
WHERE politicians.grade_current < 9
GROUP BY politicians.name
ORDER BY politicians.grade_current ASC;`

let query2 = `SELECT tmp_politicians.totalVote, tmp_politicians.name AS politicianName, (voters.first_name||" " ||voters.last_name) AS voterName, voters.gender
FROM (
  SELECT politicians.politician_id, COUNT(*) as totalVote, politicians.name
  FROM votes
  JOIN politicians ON votes.politician_id = politicians.politician_id
  GROUP BY politicians.name
  ORDER BY COUNT(*) DESC
  LIMIT 3
) AS tmp_politicians
LEFT JOIN votes ON tmp_politicians.politician_id = votes.politician_id
LEFT JOIN voters ON votes.voter_id = voters.voter_id;`

let query3 = `SELECT COUNT(*) AS totalVote, (voters.first_name||" "|| voters.last_name) AS name, voters.gender, voters.age
FROM voters
JOIN votes ON votes.voter_id = voters.voter_id
GROUP BY name
ORDER BY COUNT(*) DESC;`


let arr = [query1, query2, query3];

for(let i = 0; i < arr.length; i++){
  db.all(arr[i], (err, data) => {
    if (err) {
      throw err;
    }
    console.log("========================================================");
    console.log("\t\t\tQuery" + (i+1))
    console.log("========================================================");
    data = JSON.stringify(data, null, 2);
    console.log(data);
    console.log("\n");
  });
}
