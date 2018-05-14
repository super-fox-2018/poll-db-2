

//1
db.all(`SELECT name, location, grade_current,
COUNT (*) AS totalVote FROM Politicians
 JOIN
votes ON votes.politician_id = politicians.id
WHERE
politicians.grade_current < 9`,function(err,data){
    if(err) throw err;
    console.log(data)
});

db.all(`SELECT (SELECT count(*) FROM votes WHERE politician_id = Politicians.id GROUP BY votes.politician_id) AS "totalVote",
        Politicians.name, voters.first_name || ' ' || 
        voters.last_name, voters.gender FROM votes 
        JOIN Politicians ON votes.politician_id = Politicians.id 
        JOIN voters ON votes.voter_id = voters.id 
        WHERE Politicians.id IN 
        (SELECT Politicians.id FROM Politicians JOIN votes ON Politicians.id = votes.politician_id  
        GROUP BY Politicians.id ORDER BY count(votes.voter_id) desc LIMIT 3) 
        ORDER BY totalVote desc, Politicians.id;
`,function(err,data){
    if(err) throw err;
    console.log(data)
})

db.all(`SELECT (SELECT COUNT(*) FROM votes WHERE voter_id = voters.id)
        as "totalVote", first_name || ' ' || last_name 
        AS name, gender, age FROM voters 
        WHERE totalVote > 1 ORDER BY totalVote desc;`,function(err,data){
            if(err) throw err;
            console.log(data)
        })