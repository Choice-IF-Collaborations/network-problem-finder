// REQUIRES
const fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var helmet = require('helmet');

app.use(helmet());

// CONFIG
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.render('index.pug', function(err, html) {
  fs.writeFileSync("public/index.html", html);
});
