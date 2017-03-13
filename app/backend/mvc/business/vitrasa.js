
const soap = require('soap');
const toJS = require('xml2js').parseString;
const config = require('../../config');

class vitrasa {

    constructor () {
        soap.createClient(config.vitrasa.wsdl, (err, client) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                this.client = client;
            }
        });
    }

    stopsByPos (Latitud, Longitud) {
        return this.request('BuscarParadas', {Latitud, Longitud})
        .then(this.parseXML('BuscarParadasResult'))
        .then((json) => json.Paradas.Parada.map(this.fixStop));
    }

    stopById (IdParada) {
        return this.request('BuscarParadasIdParada', {IdParada})
        .then(this.parseXML('BuscarParadasIdParadaResult'))
        .then((json) => json.Paradas.Parada.map(this.fixStop));
    }

    estimationsByPos (Latitud, Longitud) {
        return this.request('EstimacionParadaCoordenadas', {Latitud, Longitud, Distancia: 100})
        .then(this.parseXML('EstimacionParadaCoordenadasResult'))
        .then((json) => json.NewDataSet.Estimaciones.map(this.fixEstimation));
    }

    estimationsById (IdParada) {
        return this.request('EstimacionParadaIdParada', {IdParada})
        .then(this.parseXML('EstimacionParadaIdParadaResult'))
        .then((json) => json.NewDataSet.Estimaciones.map(this.fixEstimation));
    }

    request (method, args) {
        return new Promise((resolve, reject) => {
            this.client[method](args, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    parseXML (attr) {
        return (xml) => {
            return new Promise((resolve, reject) => {
                toJS(xml[attr], function (err, json) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(json);
                    }
                });
            });
        }
    }

    fixStop (el) {
        return {
            id: el.$.idparada,
            nombre: el.$.nombre,
            distancia: el.$.distancia,
            latitud: el.$.latitud,
            longitud: el.$.longitud
        };
    }

    fixEstimation (el) {
    	return {
    		linea: el.Linea[0],
    		ruta: el.Ruta[0],
    		minutos: el.minutos[0],
    		metros: el.metros[0]
    	};
    }
}

module.exports = vitrasa;
