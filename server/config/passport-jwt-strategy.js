const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const passport = require('passport')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload)
    const user = User.findById(jwt_payload.userid)
    user.then((user)=> {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    })
    .catch((err) => {
        return done(null, false);
    })
}));