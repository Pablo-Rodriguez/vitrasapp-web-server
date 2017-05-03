
const util = require('../util.js');
const config = require('../../config');

class vitrasa {

    constructor (vitrasa, routes) {
        this.vitrasa = vitrasa;
        this.routes = routes;
    }

    stopsByPos (Latitud, Longitud) {
        return util.request(this.vitrasa, 'BuscarParadas', {Latitud, Longitud})
        .then(util.parseXML('BuscarParadasResult'))
        .then((json) => json.Paradas.Parada.map(this.fixStop));
    }

    stopById (IdParada) {
        return util.request(this.vitrasa, 'BuscarParadasIdParada', {IdParada})
        .then(util.parseXML('BuscarParadasIdParadaResult'))
        .then((json) => json.Paradas.Parada.map(this.fixStop));
    }

    estimationsByPos (Latitud, Longitud) {
        return util.request(this.vitrasa, 'EstimacionParadaCoordenadas', {Latitud, Longitud, Distancia: 100})
        .then(util.parseXML('EstimacionParadaCoordenadasResult'))
        .then((json) => json.NewDataSet.Estimaciones.map(this.fixEstimation));
    }

    estimationsById (IdParada) {
        return util.request(this.vitrasa, 'EstimacionParadaIdParada', {IdParada})
        .then(util.parseXML('EstimacionParadaIdParadaResult'))
        .then((json) => json.NewDataSet.Estimaciones.map(this.fixEstimation));
    }

    lines () {
        return util.request(this.routes, 'getRutas')
        .then((lines) => lines.rutas.ruta)
        .then((lines) => (config.crypto.rutes ? util.decode(lines) : lines))
        .then((lines) => lines.map((line) => {
            return {
                id: line.linea,
                name: line.nombre,
                ida: line.ida,
                vuelta: line.vuelta,
                url: line.url
            }
        }));
    }

    line (id) {
        return util.request(this.routes, 'getLocation', {linea: id})
        .then((line) => line.ruta)
        .then((lines) => (config.crypto.rutes ? util.decode(lines) : lines))
        .then((line) => {
            return {
                id: line.linea,
                name: line.nombre,
                ida: line.ida,
                vuelta: line.vuelta,
                url: line.url
            }
        });
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
    		ruta: el.Ruta[0].replace('Ã‘', 'Ñ').replace('Ã“', 'Ó'),
    		minutos: el.minutos[0],
    		metros: el.metros[0]
    	};
    }
}

module.exports = vitrasa;
