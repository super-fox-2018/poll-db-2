const db = require('./db');

const query1 = `SELECT 
                  politicians.name, 
                  politicians.location,
                  politicians.grade_current,
                  COUNT(*) AS totalVote
                FROM politicians
                INNER JOIN votes
                ON politicians.id = votes.politician_id
                WHERE politicians.grade_current < 9
                GROUP BY 1
                ORDER BY 4 ASC;`;
                
db.all(query1, (err, output) => {
  if (err) throw err;
  console.log('\nQuery1\'sOutputs: \n');
  console.log(output);
});

const query2 = `SELECT
                  politicians_detail.totalVote AS totalVote,
                  politicians_detail.name AS politicianName,
                  votes_detail.voterName AS voterName,
                  votes_detail.gender AS gender
                FROM (
                  SELECT 
                    politicians.id,
                    politicians.name, 
                    COUNT(*) AS totalVote
                  FROM politicians
                  INNER JOIN votes
                  ON politicians.id = votes.politician_id
                  GROUP BY 1
                  ORDER BY 3 DESC
                  LIMIT 3
                  ) AS politicians_detail
                INNER JOIN (
                  SELECT 
                    (voters.first_name || ' ' || voters.last_name) AS voterName,
                    voters.gender,
                    votes.politician_id
                  FROM voters
                  INNER JOIN votes
                  ON voters.id = votes.voter_id
                  ) AS votes_detail
                ON politicians_detail.id = votes_detail.politician_id
                ORDER BY 1 DESC, 2 ASC;`;

db.all(query2, (err, output) => {
  if (err) throw err;
  console.log('\nQuery2\'s Outputs: \n');
  console.log(output);
});

const query3 = `SELECT 
                  COUNT(*) AS totalVote,
                  (voters.first_name || ' ' || voters.last_name) AS name,
                  voters.gender,
                  voters.age
                FROM voters
                INNER JOIN votes
                ON voters.id = votes.voter_id
                GROUP BY 2
                HAVING totalVote > 1
                ORDER BY 1 DESC;`

db.all(query3, (err, output) => {
  if (err) throw err;
  console.log('\nQuery3\'s Outputs: \n');
  console.log(output);
});




