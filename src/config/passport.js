// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const { tokenTypes } = require('./tokens');
// const User = require('../Model/user.model');
// const jwtOptions = {
//   secretOrKey: "secretkey",
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// const jwtVerify = async (payload, done) => {
//     try {
//       if (payload.type !== tokenTypes.ACCESS) {
//         throw new Error('Invalid token type');
//       }
//       console.log(payload,"--------------------payload");
//       const user = await User.findById(payload.sub);
//       if (!user) {
//         return done(null, false);
//       }
//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   };
  
//   const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
  
//   module.exports = {
//     jwtStrategy,
//   };



const
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "test";

//import model
const User =require('../Model/user.model');

const usersAuth = (passport) => {
    passport.use("usersAuth",
        new JwtStrategy(opts, async function (jwt_payload, done) {
            User.findById(jwt_payload._id, function (err, user) {
                if (err) { return done(err, false) }
                else if (user) {
                    let data = {
                        id: user._id,
                    }
                    return done(null, data);
                }
                return done(null, false)
            })
        })
    )
}

module.exports={
    usersAuth
}