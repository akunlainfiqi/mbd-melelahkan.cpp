const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserByID } = require('../controller/user.controller');

module.exports = (passport) =>{
    const opts = {
        jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'secretthing',
    };
    passport.use('jwt',new JwtStrategy(opts,async (jwt_payload,done)=>{
        try{
            const user = await getUserByID(jwt_payload.id_user);
            if (user) return done(null, user[0]);
            else return done(null,false);
        } catch(err){
            return done(error,false);
        }
    }))
}
