const db = require('./setup');
let arrQuery = []
const query1 = `select candidate.name, candidate.location, candidate.grade_current, count(candidate.grade_current) AS totalVotes from candidate inner join voter_candidate
on candidate.id = voter_candidate.candidate_id
 where grade_current < 9 group by grade_current`;
 arrQuery.push(query1);

 const query2 = `
select totalVote, politicanName, (first_name || '  ' || last_name) As voterName, gender  from
(
    select candidateId, politicanName, totalVote, voter_candidate.* from
    (
        select candidate.id AS candidateId,  candidate.name AS politicanName,
        candidate.location, candidate.grade_current, count(candidate.grade_current) as totalVote from candidate inner join voter_candidate
        on candidate.id = voter_candidate.candidate_id group by grade_current order by totalVote desc limit 3
    )
    inner join voter_candidate on
    candidateId = voter_candidate.candidate_id
)
inner join voters
on voter_id = voters.id order by totalVote desc`;
arrQuery.push(query2);

const query3 = `select fraud.totalVote, first_name || ' ' || last_name AS name, gender, age from (
    select count(voter_id) AS totalVote, voter_id AS voterId from voter_candidate group by voter_id) AS fraud
    inner join voters on
    fraud.voterId = voters.id
    where fraud.totalVote > 1 order by totalVote desc`;
    arrQuery.push(query3);

 for (let i = 0; i < arrQuery.length; i++) {
    db.all(arrQuery[i], [], (err, rows) => {
        console.log(` `);
        console.log(`----- soal: ${i+1}--------`);
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    })
}
