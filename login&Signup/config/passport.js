const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = require('../models/User');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {

            User.findOne({ email: email})
            .then(user =>{
                if(!user){
                    return done(null, false, { message: 'email is not registered'});
                }

                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;
                    
                    if(isMatch) {
                       return done(null, user);
                    } else{
                        return done(null, false, { message: 'incorrect Password'});
                    }
                });
            })
             .catch(err => console.log(err));
        })
    );
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}
