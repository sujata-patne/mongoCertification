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
            minScore = 0;

                scores.forEach(function(score){
                    if(score['type'] == 'homework'){
                        console.log(score)
                        console.log(score['score'])
                        if(minScore == 0) minScore = score['score'];
                        if(minScore > scores['score']) minScore = score['score'];
                    }
                })

        })
    });
});
