
const http = require('http');
const express = require('express');
const rex = require('rexpress');
const soap = require('soap');

const config = require('./config');
const uddi = require('./uddi');
const controllers = require('./mvc/');
const middlewares = require('./middlewares');

const router = express();
const app = rex(router);
const server = http.createServer(router);
const port = process.env.PORT || config.port || 5000;

// uddi.createClients(app).then(() => {
// 	app.setControllers(controllers);
// 	app.setMiddlewares(middlewares);
// 	server.listen(port, (err) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(`\tMagic on port ${port}`);
// 		}
// 	});
// });

new Promise((resolve, reject) => {
	soap.createClient(config.wsdls.vitrasa, (err, client) => {
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
	app.setMiddlewares(middlewares);
	app.setControllers(controllers);
	server.listen(port, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`\tMagic on port ${port}`);
		}
	});
});
