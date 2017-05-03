
const soap = require('soap');

const config = require('./config');

module.exports = {
    client: null,
    getServicesInfo: function () {
        return new Promise((resolve, reject) => {
            soap.createClient(config.wsdls.juddi, (err, client) => {
                if (err) {
                    reject('Error al crear el cliente con juddi');
                } else {
                    resolve(client);
                }
            });
        }).then((client) => {
            this.client = client;
        }).then(() => {
            return new Promise((resolve, reject) => {
                this.client.find_business(config.business, (err, result) => {
                    if (err) {
                        reject('Error al buscar business');
                    } else {
                        resolve(result.businessInfos.businessInfo.serviceInfos.serviceInfo);
                    }
                });
            });
        }).then((services) => {
            return !!services[0] == true ? services : [services];
        }).then((services) => {
            return services.map((service) => {
                return service.attributes.serviceKey;
            });
        }).then((services) => {
            return Promise.all(services.map((service) => {
                return new Promise((resolve, reject) => {
                    this.client.get_serviceDetail({serviceKey: service}, (err, result) => {
                        if (err) {
                            reject('Error al buscar servicios por serviceKey');
                        } else {
                            resolve(result);
                        }
                    });
                });
            }));
        }).then((services) => {
            return services.map((service) => {
                return {
                    name: service.businessService.name,
                    wsdl: service.businessService.bindingTemplates.bindingTemplate.accessPoint['$value']
                };
            });
        }).catch((err) => console.log(err))
    },
    createVitrasa: function () {
        return new Promise((resolve, reject) => {
        	soap.createClient(config.wsdls.vitrasa, (err, client) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(client);
        		}
        	});
        });
    },
    createClients: function (app) {
        return this.getServicesInfo().then((services) => {
            return Promise.all(
                services.map((service) => {
                    return new Promise((resolve, reject) => {
                        soap.createClient(service.wsdl, (err, client) => {
                            if (err) {
                                reject('Error al crear el cliente para el servicio ' + service.name);
                            } else {
                                resolve({
                                    name: service.name,
                                    client: client
                                });
                            }
                        });
                    }).catch((err) => console.log(err));
                })
            ).then((services) => {
                return services.forEach((service) => {
                    console.log('Conectado al servicio ' + service.name);
                    app.setPlugin(service.name, service.client);
                });
            }).then(this.createVitrasa).then((client) => {
                app.setPlugin('vitrasa', client);
            });
        });
    }
};
