const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
require('dotenv').config({ override: true });
const db = require("./config/mongoose");
const passport = require('passport')
const cors = require('cors');
const cookieParser = require('cookie-parser');
var httpServer = require('http').Server(app);



app.use(cors())

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use(cookieParser());
app.use(express.static('.'))  // serving files from root directory so that it can look for public folder when serving user file from url in mongodb
  
app.use(passport.initialize())
require('./config/passport-jwt-strategy')

const socket = (require('./config/socketIO').socketActions(httpServer))

app.use("/", require("./routes/index"));



httpServer.listen(8000, () => {
  console.log("listening socket on 8000")
})

// app.listen(port, () => {
//   console.log("listening on port ", port);
// });
