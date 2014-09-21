/**
 * Module dependencies.
 */
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var lessMiddleware = require('less-middleware');
var compression    = require('compression');
var swig           = require('swig');

/**
 * Main application.
 */

// configuration
var db = require('./config/db');
var port = 8080;

// db connection
mongoose.connect(db.url);

// trust proxy
app.set('trust proxy', true);

// set up express
app.use(morgan(':remote-addr - :remote-user - :req[X-Forwarded-For] - :method :url :status :req[Content-Type] :res[Content-Type]'));
app.use(compression());
app.use(bodyParser.json());
app.use(lessMiddleware('/less', { dest: '/css', pathRoot: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));

// set Swig as the back-end template engine
app.engine('views.html', swig.renderFile);

app.set('view engine', 'views.html');
app.set('views', __dirname + '/app/views');

// get the models
require('./app/models/user.models');
require('./app/models/treatment.models');

// get the routes
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/api.routes')(app);
require('./app/routes/admin.routes')(app);

// start the app
app.listen(port);
console.log('Magic happens on port ' + port);
