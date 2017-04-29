
const soap = require('soap');

const config = require('./config');

module.exports = {
    createClients: function (app) {
        return new Promise((resolve, reject) => {
            soap.createClient(config.wsdls.juddi, (err, client) => {
                resolve(client);
            });
        }).then((client) => {
            console.log(client)
            client.find_business(config.business, (err, result) => {
                console.log(result)
            });
        })
    }
};
