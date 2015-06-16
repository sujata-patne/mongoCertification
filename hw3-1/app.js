/**
 * Created by sujatah on 6/12/2015.
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if (err) throw err;
    db.collection('students').find().toArray(function (err, docs) {
        if (err) throw err;

        docs.forEach(function (doc) {
            scores = doc['scores'];
            var minScore;
            scores.forEach(function(score){
                minScore = 0;
                if(score['type'] == 'homework'){
                    if(minScore == 0) minScore = score['score'];
                    if(minScore > scores['score']) minScore = score['score'];
                }

            })

            db.collection('students').update({"$and" : [{'_id' : doc['_id']},{ 'scores.type' : "homework"}] } , {'$pull': { 'scores': { "score": parseFloat(minScore) } } } ,function (err, students) {
                console.log(students)
                /*students.forEach(function(student){
                    console.log(doc['_id']+":"+student.scores)
                })*/

            })
        })
    });
});
