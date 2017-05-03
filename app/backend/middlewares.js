
const join = require('path').join;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');

const passportConfig = require('./middlewares/passport');
const auth = require('./middlewares/auth');


module.exports = (rex) => {
	passportConfig(passport, rex);
	rex.load('morgan', morgan('dev'));
	rex.load('body-parser-urlencoded', bodyParser.urlencoded({extended: false}));
	rex.load('body-parser-json', bodyParser.json());
	rex.load('method-override', methodOverride('_method'));
	rex.load('cookie-parser', cookieParser());
	rex.load('express-session', expressSession({
		secret: process.env.EXPRESS_SESSION_SECRET || 'secreto a cambiar en produccion',
		resave: false,
		saveUninitialized: false
	}));
	rex.load('passport', passport.initialize());
	rex.load('passport-session', passport.session());
	rex.load('auth', auth('/#/'));
	rex.load('static', express.static(join(__dirname, '/public')));

	rex.use('morgan');
	rex.use('body-parser-urlencoded');
	rex.use('body-parser-json');
	rex.use('method-override');
	rex.use('cookie-parser');
	rex.use('express-session');
	rex.use('passport');
	rex.use('passport-session');
	rex.use('static');
};
