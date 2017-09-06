const express = require("express");
const path    = require("path");
const routes  = require("./routes/index");
const passport = require("passport");
const BasicStrategy = require('passport-http').BasicStrategy;
const morgan  = require("morgan");
const bodyParser = require("body-parser");
const flash   = require('express-flash-messages');
const model   = require("./models/index");
const cookieParser = require('cookie-parser');
const app     = express();

const users = {
  'isaac': 'password'
};

//
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(morgan("dev"));



passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });





app.use(passport.initialize());
app.use(flash());

// app.use("/api",routes);
app.use(routes);

app.listen(3000, function() {
  console.log("app is running on local 3000");
})
