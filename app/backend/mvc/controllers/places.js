
const Model = require('../business/places');

class places {
    constructor (rex) {
        this.model = new Model(rex.getPlugin('places'));
        rex.get('/places/by-position', this.get);
    }

    get (req, res) {
        // TODO -> cambiar los mocks por los datos del servicio externo
        res.json([
            {
                name: 'Gruas y transportes Barreiro',
                lat: 42.2099827,
                lng: -8.700656799999999
            },
            {
                name: 'Eduardo Alonso',
                lat: 42.20961399999999,
                lng: -8.702802
            },
            {
                name: 'A casa da Peteta',
                lat: 42.2101944,
                lng: -8.700333499999999
            },
            {
                name: 'Carpinaval',
                lat: 42.206927,
                lng: -8.699814199999999
            },
            {
                name: 'AUTOS ROSAS',
                lat: 42.208653,
                lng: -8.698027999999999
            },
        ]);
    }
}

module.exports = places;
