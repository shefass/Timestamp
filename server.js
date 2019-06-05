// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//My first API

app.get("/api/timestamp/:date_string", function(req, res) {
  var date = req.params.date_string;
  
  if (/\D/.test(date)) {   //user enters only numbers
    if (/\d\-\d{2}\-\d{2}$/.test(date)){
      var dateInstance = new Date(date);
      res.json({ unix: dateInstance.getTime(), utc: dateInstance.toUTCString()});
    } else {
       res.json({"unix": null, "utc" : "Invalid Date" })
    }
   
  } else {
    var dateInstance = new Date(Number(date));
    res.json({ unix: dateInstance.getTime(), utc: dateInstance.toUTCString()});
   
  }
});

//if user dont enters
app.get("/api/timestamp/", function(req, res) {
  var dateInstance = new Date();
  res.json({ unix: dateInstance.getTime(), utc: dateInstance.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
