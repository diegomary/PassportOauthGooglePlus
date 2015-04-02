var Vars= require('./vars');

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(Vars.bodyParser.json());
app.use(Vars.bodyParser.urlencoded({ extended: true }));
app.use(Vars.cookieParser());
app.use(Vars.expressSession({ secret: 'dmm888com', saveUninitialized: true, resave: true }));
app.use(Vars.passport.initialize());
app.use(Vars.passport.session());


app.get('/',Vars.ensureAuthenticated, function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/maps',Vars.ensureAuthenticated, function(req, res){
  res.sendFile(__dirname + '/maps.html');
});



app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html');
});

app.get('/auth/google', Vars.passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));



app.get('/oauth2callback', Vars.passport.authenticate('google'), function(req, res) {
    res.redirect( req.session.redirectto || '/');
}); 


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


 
var server = app.listen(process.env.PORT, process.env.IP, function () {
    var host = server.address().address;
    var port = server.address().port;    
    console.log('One Thread of PassportAuth application listening on http://%s:%s', host, port);

});









