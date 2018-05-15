var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Database.db');

	db.all(`SELECT name,location,grade_curent,COUNT(*) AS totalVote FROM Votes  JOIN Politicians 
ON Votes.politicianId = Politicians.id WHERE grade_curent < 9 GROUP BY name ORDER BY grade_curent ASC`,function(err,data) {
		if(err) {
			throw err
		}

		console.log(data)

})


	db.all(`SELECT totalVote,Politicians.name AS politicianName,first_name ||' '||last_name AS voterName,gender 
		FROM Votes
		JOIN Politicians
		ON Votes.politicianId = Politicians.id 
		JOIN voters
		ON Votes.voterId = Voters.id
		ORDER BY totalVote DESC`,function(err,data) {
		if(err) {
			throw err
		}

		console.log(data)
}) 