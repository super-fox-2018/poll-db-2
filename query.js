const db = require('./seed-data')

db.all(`SELECT name, location, grade_current,
        COUNT (*) AS totalVote FROM politicians JOIN
        votes ON votes.politicianId = politicians.politicianId WHERE 
        politicians.grade_current < 9 GROUP BY name ORDER BY grade_current asc`, function (err, pol){
                if(err) throw err
                console.log(pol)
                console.log("================")
})

db.all(`SELECT COUNT (*) AS totalVote, politicians.name AS politicianName, (first_name || ' ' || last_name) AS voterName, gender FROM votes 
    JOIN politicians ON votes.politicianId = politicians.politicianId
    JOIN voters ON voters.voterId = votes.voterId
    GROUP BY politicians.name ORDER BY totalVote desc LIMIT 3`, function(err, pol){
        if(err) throw err
        console.log(pol)
        console.log("================")
})

db.all(`SELECT COUNT (*) AS totalVote, (first_name || ' ' || last_name) AS name, gender, age FROM voters
JOIN votes ON votes.voterId = voters.voterId
GROUP BY voters.first_name HAVING totalVote > 1 ORDER BY totalVote desc`, function(err, pol){
    if(err) throw err
    console.log(pol)
    console.log("================")
})


