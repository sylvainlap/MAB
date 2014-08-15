/**
 * Module dependencies.
 */
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var lessMiddleware = require('less-middleware');

/**
 * Main application.
 */

// configuration
var db = require('./config/db');
var port = 8080;

// db connection
mongoose.connect(db.url);

// set up express
app.use(bodyParser.json());
app.use(morgan(':method :url :status :req[Content-Type] :res[Content-Type]'));
app.use(lessMiddleware('/less', { dest: '/css', pathRoot: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));

// get the models
require('./app/models/user.models');
require('./app/models/treatment.models');

// get the routes
require('./app/routes/core.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/api.routes')(app);

// start the app
app.listen(port);
console.log('Magic happens on port ' + port);
