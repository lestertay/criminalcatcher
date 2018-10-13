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
	var newEntry = new db.Crim();
	var data = req.body;
	for (var property in data){
		console.log(property);
		newEntry[property] = data[property];
		console.log(data[property]);
	}
	newEntry.img = fs.readFileSync(req.file.path);
	newEntry.save();

	res.render("data", {data})
});

app.get("/testdb/", function(req, res){
    db.Crim.find()
    .then(function(todo){
		res.status(201).json(todo);
	})
	.catch(function(err){
		res.send(err);
	});
});

app.get("/testdb/clear", function(req, res){
	db.Crim.deleteMany({}, (err) => {
		if (err){
			console.log("Error");
		}
		else {
			res.send("Success");
		}
	});
});

app.listen(8100, ()=> {console.log("listening on 8100")}
);
