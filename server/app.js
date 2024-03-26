var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ip = require('ip');
const config_app = require('./config/app');

var web_router = require('./routes/web');
var auth_router = require('./routes/auth');

var app = express();

require('./config/database')();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
http://192.168.0.104:4040
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', web_router.routes);
app.use('/api', auth_router.routes);

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

var port = process.env.PORT || config_app.app_port;

app.listen(port, () => {
    console.log(`Example app listening on url http://` + ip.address() + `:` + port)
});

