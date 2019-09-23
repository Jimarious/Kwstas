//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = [
    {
    email_address: email,
    status: subscribed
    }
  ];
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/5ae9603efb",
    method: "POST",
    headers: {
      "Authoraization": "Jimarious 8fa55358cc803bfafffc043ea03ace6f-us20"
    },
    body: jsonData
  };
  request(options, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});
app.listen(3000, function() {
  console.log("Server running on port 3000");
});

//8fa55358cc803bfafffc043ea03ace6f-us20
//5ae9603efb
