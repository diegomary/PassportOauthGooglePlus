var exports =  module.exports = {
    
expressSession : require('express-session'),
passport : require('passport'),
cookieParser : require('cookie-parser'),
bodyParser : require('body-parser'),
GoogleStrategy : require( 'passport-google-oauth2' ).Strategy,
GOOGLE_CLIENT_ID : "144183426431-on4vq84epahj66jh2tof67ec4dkvo88l.apps.googleusercontent.com",
GOOGLE_CLIENT_SECRET  : "GG788wjOXpU0ZuYwuMACVEMT",


ensureAuthenticated: function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.redirectto=req.path;
  res.redirect('/login');
}

};

exports.passport.use(new exports.GoogleStrategy({
    clientID:     exports.GOOGLE_CLIENT_ID,
    clientSecret: exports.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://oauthopenidgoogleplus-diegomary.c9.io/oauth2callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      return done(null, profile);
    });
  }
));


exports.passport.serializeUser(function(user, done) {
  done(null, user);
});
exports.passport.deserializeUser(function(obj, done) {
  done(null, obj);
});  
    
    






