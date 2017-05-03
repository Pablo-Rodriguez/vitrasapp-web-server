
const util = require('../util');
const config = require('../../config');

class places {
    constructor (client) {
        this.client = client;
    }

    get (latitud, longitud) {
        return util.request(this.client, 'getPlaces', {lat: latitud, lng: longitud})
        .then((places) => (config.crypto.places ? util.decode(places) : util.normalizeObj(places)))
        .then((places) => places.places.place);
    }
}

module.exports = places;
