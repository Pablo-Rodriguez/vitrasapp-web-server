
const Model = require('../business/vitrasa');
const util = require('../util');

const config = require('../../config.js');

class vitrasa {

    constructor (rex) {
        this.model = new Model(rex.getPlugin(config.services.vitrasa), rex.getPlugin(config.services.rutes));
        rex.get('/vitrasa/stops/by-position', this.getStopsByPos.bind(this));
        rex.get('/vitrasa/stops/by-id', this.getStopByID.bind(this));
        rex.get('/vitrasa/estimations/by-position', this.getEstimationsByPos.bind(this));
        rex.get('/vitrasa/estimations/by-id', this.getEstimationsByID.bind(this));
        rex.get('/vitrasa/lines', this.getLines.bind(this));
        rex.get('/vitrasa/line', this.getLine.bind(this));
    }

    // Endpoints
    getStopsByPos (req, res) {
        util.sendJSON(res, this.model.stopsByPos(
            req.query.latitud,
            req.query.longitud));
    }

    getStopByID (req, res) {
        util.sendJSON(res, this.model.stopById(req.query.id));
    }

    getEstimationsByPos (req, res) {
        util.sendJSON(res, this.model.estimationsByPos(
            req.query.latitud,
            req.query.longitud));
    }

    getEstimationsByID (req, res) {
        util.sendJSON(res, this.model.estimationsById(req.query.id));
    }

    getLines (req, res) {
        util.sendJSON(res, this.model.lines());
    }

    getLine (req, res) {
        util.sendJSON(res, this.model.line(req.query.id));
    }
}

module.exports = vitrasa;
