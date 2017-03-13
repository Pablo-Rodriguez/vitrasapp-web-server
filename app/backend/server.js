
const http = require('http');
const express = require('express');
const Rex = require('rexpress');

const config = require('./config');
const controllers = require('./mvc/');
const middlewares = require('./middlewares');

const router = express();
const app = new Rex(router);
const server = http.createServer(router);
const port = process.env.PORT || config.port || 5000;

app.setControllers(controllers);
app.setMiddlewares(middlewares);

server.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`\tMagic on port ${port}`);
	}
});
