const express = require("express"),
bodyParser	  = require("body-parser"),
		app   = express();

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.sendFile("index.html");
});

app.post("/", function(req,res){
	var data = req.body
	console.log(data)
	res.render("data", {data})
});

app.listen(8100, ()=> {console.log("listening on 8100")}
);