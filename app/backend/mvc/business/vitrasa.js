
const toJS = require('xml2js').parseString;

class vitrasa {

    constructor (vitrasa) {
        this.client = vitrasa;
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

    lines () {
        return new Promise((resolve, reject) => {
            resolve([
                {id: 'C1', name: 'CIRCULAR CENTRO', ida: 'PZA. AMÉRICA - CORUÑA - PZA. EUGENIO FADRIQUE - TORRECEDEIRA – GAITEIRO R. PORTELA - BERBÉS – CÁNOVAS DEL CASTILLO – G. OLLOQUI - PZA. COMPOSTELA – RECONQUISTA – P. SANZ - COLÓN - URZÁIZ - GRAN VIA - PZA. ESPAÑA - BARCELONA - CAMELIAS - PZA. AMÉRICA.', vuelta: 'SOLO IDA (LÍNEA CIRCULAR)'},
                {id: 'L8', name: 'AREAL – PORTO / UNIVERSIDADE', ida: 'ESTACIÓN FF.CC. (GUIXAR) – AREAL – COLÓN – P. SANZ – Pº ALFONSO XII – PI I MARGALL – LÓPEZ MORA – PZA. AMÉRICA – AVDA. CASTRELOS – CLARA CAMPOAMOR – CORREDOURA – CASTRELOS COSTA – PORTOLOUREIRO – SEIXO – ESTR. VENDA – PORTO – FALCOIDO – UNIVERSIDADE', vuelta: 'UNIVERSIDADE – FALCOIDO – PORTO – ESTR. VENDA – SEIXO – PORTOLOUREIRO – CASTRELOS COSTA – PONTILLÓN – LATERAL ARQUITECTO PALACIOS – AVDA. CASTRELOS - GRAN VÍA – PZA. ESPAÑA - GRAN VÍA – URZÁIZ – REPÚBLICA ARGENTINA – G. BARBÓN – MIRAGALLA - ESTACIÓN FF.CC. (GUIXAR)'},
                {id: 'C1', name: 'CIRCULAR CENTRO', ida: 'PZA. AMÉRICA - CORUÑA - PZA. EUGENIO FADRIQUE - TORRECEDEIRA – GAITEIRO R. PORTELA - BERBÉS – CÁNOVAS DEL CASTILLO – G. OLLOQUI - PZA. COMPOSTELA – RECONQUISTA – P. SANZ - COLÓN - URZÁIZ - GRAN VIA - PZA. ESPAÑA - BARCELONA - CAMELIAS - PZA. AMÉRICA.', vuelta: 'SOLO IDA (LÍNEA CIRCULAR)'},
                {id: 'L8', name: 'AREAL – PORTO / UNIVERSIDADE', ida: 'ESTACIÓN FF.CC. (GUIXAR) – AREAL – COLÓN – P. SANZ – Pº ALFONSO XII – PI I MARGALL – LÓPEZ MORA – PZA. AMÉRICA – AVDA. CASTRELOS – CLARA CAMPOAMOR – CORREDOURA – CASTRELOS COSTA – PORTOLOUREIRO – SEIXO – ESTR. VENDA – PORTO – FALCOIDO – UNIVERSIDADE', vuelta: 'UNIVERSIDADE – FALCOIDO – PORTO – ESTR. VENDA – SEIXO – PORTOLOUREIRO – CASTRELOS COSTA – PONTILLÓN – LATERAL ARQUITECTO PALACIOS – AVDA. CASTRELOS - GRAN VÍA – PZA. ESPAÑA - GRAN VÍA – URZÁIZ – REPÚBLICA ARGENTINA – G. BARBÓN – MIRAGALLA - ESTACIÓN FF.CC. (GUIXAR)'}
            ]);
        });
    }

    line (id) {
        return new Promise ((resolve, reject) => {
            resolve(
                {id: 'C1', name: 'CIRCULAR CENTRO', ida: 'PZA. AMÉRICA - CORUÑA - PZA. EUGENIO FADRIQUE - TORRECEDEIRA – GAITEIRO R. PORTELA - BERBÉS – CÁNOVAS DEL CASTILLO – G. OLLOQUI - PZA. COMPOSTELA – RECONQUISTA – P. SANZ - COLÓN - URZÁIZ - GRAN VIA - PZA. ESPAÑA - BARCELONA - CAMELIAS - PZA. AMÉRICA.', vuelta: 'SOLO IDA (LÍNEA CIRCULAR)'}
            );
        });
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
    		ruta: el.Ruta[0].replace('Ã‘', 'Ñ'),
    		minutos: el.minutos[0],
    		metros: el.metros[0]
    	};
    }
}

module.exports = vitrasa;
