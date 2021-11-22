const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const corsMiddleware = require('restify-cors-middleware');
let collection, database;
const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});
MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function (err, db) {
    if (!err) {
        console.log("We are connected");
        database = db.db("uebung03");
        collection = database.collection("students");
    }
})
const restServer = restify.createServer({
    name: "Uebung3-Rest-Server"
})
restServer.pre(cors.preflight);
restServer.use(cors.actual);
restServer.use(restify.plugins.bodyParser());

restServer.post('/student/add', (req,res,next) => {
    console.log(req.body);
    let studenname = req.body.name;
    let semester = req.body.semester;
    let degree = req.body.degree;
    if(studenname && semester && degree) {
        let studentObj = {
            name: studenname,
            semester: semester,
            degree: degree
        }
        collection.insertOne(studentObj);
        res.send(200, {message: 'Added'});
    } else {
        res.send(400);
    }
    next();
});

restServer.del('/student/delete/:studenname', (req,res,next) => {
    let studenname = req.params.studenname;
    if(studenname) {
        collection.removeOne({name: studenname});
        res.send(200, {message: 'deleted'});
    } else {
        res.send(400);
    }
    next();
});
restServer.get('/student/list', (req,res,next) => {
    let students;
    collection.find().toArray(function(err, result) {
        if (err) throw err;
        students = result;
        res.send(students);
    });
    next();
});

restServer.get('/', (req,res,next) => {
    res.send(200, {message: 'Hello World, this is the index route'})
    next();
});

restServer.listen('3000', () => {
    console.log(`Listen on 3000`);
})
