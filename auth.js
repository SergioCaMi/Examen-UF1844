const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

// Verificar si está en modo dummy (sin OAuth real)
if (process.env.USE_DUMMY_AUTH === 'true') {
  console.log('🔓 Modo dummy activado - Sin autenticación OAuth real');
  
  // En modo dummy, no configuramos GoogleStrategy
  // Las rutas de autenticación se manejan en index.js
} else {
  console.log('🔐 Modo OAuth real activado');
  
  // Configuración real de Google OAuth
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});