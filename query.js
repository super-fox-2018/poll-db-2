"use strict"
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./congress_poll_results.db');

db.all(`SELECT * FROM congress_members WHERE grade_current < ? ORDER BY grade_current ASC`,[9],(err,rows)=>{
    if(err) throw err;
    console.log(rows)
})


db.all(`
WITH politician_counts AS (
    SELECT COUNT(*) AS TotalVotes, 
    politicianId FROM votes 
    GROUP BY politicianId
) 
    SELECT TotalVotes, 
    congress_members.name 
    FROM politician_counts JOIN congress_members 
    ON politician_counts.politicianId = congress_members.id 
    WHERE TotalVotes <= (
        WITH limit_3 AS(
            WITH vote_count AS(
                SELECT COUNT(*) AS totalVotes 
                FROM votes 
                GROUP BY politicianId 
                ORDER BY totalVotes DESC) 
                SELECT totalVotes FROM vote_count 
                GROUP BY totalVotes ORDER BY totalVotes 
                DESC LIMIT 3) 
                SELECT TotalVotes FROM limit_3) 
                AND TotalVotes >= (
                    WITH limit_3 AS(
                        WITH vote_count AS(
                            SELECT COUNT(*) AS totalVotes 
                            FROM votes GROUP BY politicianId 
                            ORDER BY totalVotes DESC) 
                            SELECT totalVotes 
                            FROM vote_count 
                            GROUP BY totalVotes 
                            ORDER BY totalVotes DESC LIMIT 3) 
                            SELECT TotalVotes FROM limit_3 
                            ORDER BY TotalVotes ASC) 
                            ORDER BY totalVotes DESC
    
    `,(err,rows)=>{
    if (err) throw err;
    console.log('\n')
    console.log(rows)
})

db.all(`
    WITH topCounts AS(
        WITH top_congress AS (
            WITH limit_3 AS (
                SELECT COUNT(*) 
                AS votecount,politicianId 
                FROM votes 
                GROUP BY politicianId 
                ORDER BY votecount 
                DESC LIMIT 3
            ) SELECT limit_3.*,congress_members.name 
            FROM limit_3  
            JOIN congress_members 
            ON congress_members.id = limit_3.politicianId
        ) SELECT top_congress.name,top_congress.votecount,votes.voterId 
        FROM votes 
        JOIN top_congress 
        ON votes.politicianId = top_congress.politicianId
    ) SELECT topCounts.name AS politician, topCounts.votecount AS votes, (voters.first_name || " " || voters.last_name) AS name FROM topCounts JOIN voters ON topCounts.voterId = voters.id ORDER BY votecount DESC`,(err,rows)=>{
    if(err) throw err;
    console.log('\n')
    console.log(rows)

})

db.all(`SELECT COUNT(*) AS votecount, (voters.first_name || ' ' || voters.last_name) AS name FROM votes JOIN voters ON votes.voterId = voters.id GROUP BY votes.voterId HAVING votecount > 1 ORDER BY votecount DESC`,(err, rows)=>{
    if(err) throw err;
    console.log('\n')
    console.log(rows)
})
