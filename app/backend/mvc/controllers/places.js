
const Model = require('../business/places');
const util = require('../util');

const config = require('../../config');

class places {
    constructor (rex) {
        this.model = new Model(rex.getPlugin(config.services.places));
        rex.get('/places/by-position', this.get.bind(this));
    }

    get (req, res) {
        util.sendJSON(res, this.model.get(req.query.latitud, req.query.longitud));
    }
}

module.exports = places;
