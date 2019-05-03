const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')
var User = require('../models/user');


passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,'user', function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded.id._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));
