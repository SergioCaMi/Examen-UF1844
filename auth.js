const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config(  
    {path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'}
);

// Asegúrate de requerir tu modelo User aquí
// const User = require('./models/User'); // Descomenta y ajusta la ruta según tu proyecto

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // Si no tienes un modelo User, puedes dejar solo el profile
    // Si tienes un modelo User, descomenta la siguiente línea y ajusta
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

// Middleware para inicializar Passports
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});