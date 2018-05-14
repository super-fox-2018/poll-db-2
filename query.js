const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

let query1 =
`SELECT name, location, grade_current, COUNT(voter_id) AS 'total_votes'
FROM votes
JOIN politicians
	ON politicians.id = votes.politician_id
WHERE politicians.grade_current < 9
GROUP BY politician_id
ORDER BY politicians.grade_current ASC;`;

let query2 =
`SELECT total_votes, politician_name, (first_name || ' ' || last_name) AS voter_name, gender AS voter_gender
FROM (SELECT voters.first_name, voters.last_name, voters.gender, votes.politician_id AS newId
	FROM voters
	JOIN votes ON voters.id = votes.voter_id)
JOIN (SELECT COUNT(voter_id) AS total_votes,  politicians.id AS id, politicians.name AS politician_name
	FROM votes
	JOIN politicians ON politicians.id = votes.politician_id
	GROUP BY politician_id
	ORDER BY total_votes DESC
	LIMIT 3)
ON id = newId
ORDER BY total_votes DESC, politician_name;`;

let query3 =
`SELECT COUNT(*) AS total_votes, first_name, last_name, gender, age
FROM voters
JOIN votes ON voters.id = votes.voter_id
GROUP BY voters.id
HAVING total_votes > 1
ORDER BY total_votes DESC, first_name, last_name;`;

let arrayOfQuery = [query1, query2, query3];

for (let i = 0; i < arrayOfQuery.length; i++) {
  let query = arrayOfQuery[i];
  db.all(query, function(err, result) {
    if (err) throw err;
    console.log(`QUERY #${i + 1}`);
    console.log(result);
  });
}
