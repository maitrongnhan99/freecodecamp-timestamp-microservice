// index.js
// where your node app starts
require("dotenv").config()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  })
})

app.get("/api/:date?", (req, res) => {
  const timestamp = req.params.date

  const isInValidDate = !Boolean(new Date(timestamp))
  const isTimestamp= !!Number(timestamp)

  const covertToUTC = new Date(timestamp).toUTCString()
  const covetTimestampToUTC = new Date(Number(timestamp)).toUTCString();

  if(isTimestamp && !!covetTimestampToUTC) {
    console.log("Case time valid")
   return res.json({
      "unix": Number(timestamp),
      "utc": covetTimestampToUTC
    })
  }

  console.log(!isInValidDate,!isTimestamp,!!covertToUTC,!covetTimestampToUTC)

  if(!isInValidDate && !isTimestamp && !!covertToUTC && Number(new Date(timestamp).getTime())) {
    console.log("Case timestamp")
    return res.json({
      "unix": Number(new Date(timestamp).getTime()),
      "utc": covertToUTC
    })
  }


    return res.json({ error : "Invalid Date" })


})



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
