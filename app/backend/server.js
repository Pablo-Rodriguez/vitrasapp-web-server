
const http = require('http');
const express = require('express');
const rex = require('rexpress');
const soap = require('soap');

const config = require('./config');
const controllers = require('./mvc/');
const middlewares = require('./middlewares');

const router = express();
const app = rex(router);
const server = http.createServer(router);
const port = process.env.PORT || config.port || 5000;

new Promise((resolve, reject) => {
	soap.createClient(config.vitrasa.wsdl, (err, client) => {
		if (err) {
			reject(err);
		} else {
			resolve(client);
		}
	});
})
.then((vitrasa) => {
	app.setPlugin('user', {});
	return app.setPlugin('vitrasa', vitrasa);
})
.then(() => {
	app.setControllers(controllers);
	app.setMiddlewares(middlewares);
	server.listen(port, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`\tMagic on port ${port}`);
		}
	});
});
