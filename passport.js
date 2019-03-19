const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('./models/user');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'jelszo'
    },
    function(email,jelszo,done) {
        userModel.findOne({
            email
        },
        function(err, user){
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Ilyen email címmel nincs regisztrált felhasználó.' });
            }

            user.comparePassword(jelszo, function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    return done(null,user);
                }
                return done(null, false, { message: 'Hibás jelszó!' });
            })
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;