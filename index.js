var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./polldb-1.db');

function nomor_1() {
	let query = "SELECT name,location,grade_current,COUNT(*) AS totalVote FROM votes  JOIN politicians ON votes.politician_id = politicians.id WHERE grade_current < 9 GROUP BY name ORDER BY grade_current ASC"
	db.all(query,function(err,rows) {
		if(err) {
			throw err
		}

		console.log(rows)

	})
}

function nomor_2() {
	let query =
	`SELECT totalVote,politiciansCupu.name AS politicianName,first_name ||' '||last_name AS voterName,gender 
		FROM votes
		JOIN politiciansCupu
		ON votes.politician_id = politiciansCupu.id 
		JOIN voters
		ON votes.voter_id = voters.id
		ORDER BY totalVote DESC`

	db.all(query,function(err,rows) {
		if(err) {
			throw err
		}

		console.log(rows)
	})	
}

function nomor_3() {
	let query = 
	`SELECT  COUNT(*)AS totalVote,first_name||' '||last_name AS name,gender,age 
		FROM votes 
		JOIN voters
		ON votes.voter_id = voters.id
		GROUP BY first_name ||' '||last_name 
		HAVING totalVote>1
		ORDER BY totalVote DESC`

	db.all(query,function(err,rows) {
		if(err) {
			throw err
		}
		console.log(rows)
	})	
}

//		nomor_1();
// nomor_2();
nomor_3()