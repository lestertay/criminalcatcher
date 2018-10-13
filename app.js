const express = require("express"),
bodyParser	  = require("body-parser"),
multer		  = require("multer"),
fs			  = require("fs"),
db			  = require("./models/db.js");
app			  = express(),
upload		  = multer({ dest : "./uploads" });

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.sendFile("index.html");
});

app.post("/", upload.single("jpeg"), function(req,res){
	var data = req.body;
	console.log(data);
	var newEntry = new db.Crim();
	newEntry.img = fs.readFileSync(req.file.path);
	newEntry.save();

	res.render("data", {data})
});

app.get('/testdb/', function(req, res){
    db.Crim.find()
    .then(function(todo){
		res.status(201).json(todo);
	})
	.catch(function(err){
		res.send(err);
	});
});

app.listen(8100, ()=> {console.log("listening on 8100")}
);
