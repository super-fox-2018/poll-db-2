const db = require('./db.js');


db.all(`select * from politicians order by grade_current asc limit 3`, (err, result)=>{
    if(err) throw result;
    console.log (result);
    console.log('-------------------------------------------------');
});

db.all(`select count(voters.id)  as TotalVote, voters.* 
        from voters left outer join votes on votes.voters_id = voters.id 
        group by voters.id having totalVote > 1 order by totalVote  desc;`, (err, result)=>{
    if(err) throw result;
    console.log (result);
    console.log('-------------------------------------------------');
});

