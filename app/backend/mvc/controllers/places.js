
const Model = require('../business/places');

class places {
    constructor (rex) {
        this.model = new Model(rex.getPlugin('places'));
        rex.get('/places/by-location', this.get);
    }

    get (req, res) {
        res.end();
    }
}

module.exports = places;
