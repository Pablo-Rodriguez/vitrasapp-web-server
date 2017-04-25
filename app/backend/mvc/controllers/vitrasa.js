
const Model = require('../business/vitrasa');

class vitrasa {

    constructor (rex) {
        this.model = new Model();
        rex.get('/vitrasa/stops/by-position', this.getStopsByPos.bind(this));
        rex.get('/vitrasa/stops/by-id', this.getStopByID.bind(this));
        rex.get('/vitrasa/estimations/by-position', this.getEstimationsByPos.bind(this));
        rex.get('/vitrasa/estimations/by-id', this.getEstimationsByID.bind(this));
    }

    getStopsByPos (req, res) {
        this.sendJSON(res, this.model.stopsByPos(
            req.query.latitud,
            req.query.longitud));
    }

    getStopByID (req, res) {
        this.sendJSON(res, this.model.stopById(req.query.id));
    }

    getEstimationsByPos (req, res) {
        this.sendJSON(res, this.model.estimationsByPos(
            req.query.latitud,
            req.query.longitud));
    }

    getEstimationsByID (req, res) {
        this.sendJSON(res, this.model.estimationsById(req.query.id));
    }

    sendJSON (res, promise) {
        promise.then((json) => {
            res.json(json);
        }).catch((err) => {
            res.sendStatus(404);
        });
    }
}

module.exports = vitrasa;
