
const join = require('path').join;

const express = require('express');
const morgan = require('morgan');

module.exports = (rex) => {
	rex.load('morgan', morgan('dev'));
	rex.load('static', express.static(join(__dirname, '/public')));

	rex.use('morgan');
	rex.use('static');
}
