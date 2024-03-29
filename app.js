//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
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
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/5ae9603efb",
    method: "POST",
    headers: {
      "Authorization": "1bit 8fa55358cc803bfafffc043ea03ace6f-us20"
    },
    body: jsonData
  };
  request(options, function(error, response, body){
    if(response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }
  });
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
});

//8fa55358cc803bfafffc043ea03ace6f-us20
//5ae9603efb
