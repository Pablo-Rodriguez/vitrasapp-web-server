
const passport = require('passport');
const Model = require('../business/user');
const util = require('../util');

const config = require('../../config');

class user {
	constructor (rex) {
        this.model = new Model(rex.getPlugin(config.services.db));
		rex.post('/usuarios/signup', this.newUser.bind(this));
		rex.post('/usuarios/login', passport.authenticate('local', {
			successRedirect: '/#/perfil',
			failureRedirect: '/#/login'
		}));
		rex.get('/usuarios/perfil', 'auth', this.get.bind(this));
		rex.get('/usuarios/paradas-favoritas', 'auth', this.favStops.bind(this));
		rex.get('/usuarios/lineas-favoritas', 'auth', this.favLines.bind(this));
		rex.post('/usuarios/paradas-favoritas', 'auth', this.addFavStop.bind(this));
		rex.post('/usuarios/lineas-favoritas', 'auth', this.addFavLine.bind(this));
		rex.delete('/usuarios/paradas-favoritas', 'auth', this.deleteFavStop.bind(this));
		rex.delete('/usuarios/lineas-favoritas', 'auth', this.deleteFavLine.bind(this));
		rex.delete('/usuarios', 'auth', this.deleteUser.bind(this));
		rex.get('/usuarios/logout', 'auth', this.logout);
	}

	newUser (req, res) {
		this.model.create(req.body)
		.then(() => res.redirect('/#/perfil'))
		.catch(() => res.redirect('/#/signup'));
	}

	get (req, res) {
		util.sendJSON(res, this.model.getUser(req.user.username));
	}

	favStops (req, res) {
		res.end();
	}

	favLines (req, res) {
		res.json([
			{id: 'C1', name: 'CIRCULAR CENTRO', ida: 'PZA. AMÉRICA - CORUÑA - PZA. EUGENIO FADRIQUE - TORRECEDEIRA – GAITEIRO R. PORTELA - BERBÉS – CÁNOVAS DEL CASTILLO – G. OLLOQUI - PZA. COMPOSTELA – RECONQUISTA – P. SANZ - COLÓN - URZÁIZ - GRAN VIA - PZA. ESPAÑA - BARCELONA - CAMELIAS - PZA. AMÉRICA.', vuelta: 'SOLO IDA (LÍNEA CIRCULAR)'},
			{id: 'L8', name: 'AREAL – PORTO / UNIVERSIDADE', ida: 'ESTACIÓN FF.CC. (GUIXAR) – AREAL – COLÓN – P. SANZ – Pº ALFONSO XII – PI I MARGALL – LÓPEZ MORA – PZA. AMÉRICA – AVDA. CASTRELOS – CLARA CAMPOAMOR – CORREDOURA – CASTRELOS COSTA – PORTOLOUREIRO – SEIXO – ESTR. VENDA – PORTO – FALCOIDO – UNIVERSIDADE', vuelta: 'UNIVERSIDADE – FALCOIDO – PORTO – ESTR. VENDA – SEIXO – PORTOLOUREIRO – CASTRELOS COSTA – PONTILLÓN – LATERAL ARQUITECTO PALACIOS – AVDA. CASTRELOS - GRAN VÍA – PZA. ESPAÑA - GRAN VÍA – URZÁIZ – REPÚBLICA ARGENTINA – G. BARBÓN – MIRAGALLA - ESTACIÓN FF.CC. (GUIXAR)'},
			{id: 'C1', name: 'CIRCULAR CENTRO', ida: 'PZA. AMÉRICA - CORUÑA - PZA. EUGENIO FADRIQUE - TORRECEDEIRA – GAITEIRO R. PORTELA - BERBÉS – CÁNOVAS DEL CASTILLO – G. OLLOQUI - PZA. COMPOSTELA – RECONQUISTA – P. SANZ - COLÓN - URZÁIZ - GRAN VIA - PZA. ESPAÑA - BARCELONA - CAMELIAS - PZA. AMÉRICA.', vuelta: 'SOLO IDA (LÍNEA CIRCULAR)'},
			{id: 'L8', name: 'AREAL – PORTO / UNIVERSIDADE', ida: 'ESTACIÓN FF.CC. (GUIXAR) – AREAL – COLÓN – P. SANZ – Pº ALFONSO XII – PI I MARGALL – LÓPEZ MORA – PZA. AMÉRICA – AVDA. CASTRELOS – CLARA CAMPOAMOR – CORREDOURA – CASTRELOS COSTA – PORTOLOUREIRO – SEIXO – ESTR. VENDA – PORTO – FALCOIDO – UNIVERSIDADE', vuelta: 'UNIVERSIDADE – FALCOIDO – PORTO – ESTR. VENDA – SEIXO – PORTOLOUREIRO – CASTRELOS COSTA – PONTILLÓN – LATERAL ARQUITECTO PALACIOS – AVDA. CASTRELOS - GRAN VÍA – PZA. ESPAÑA - GRAN VÍA – URZÁIZ – REPÚBLICA ARGENTINA – G. BARBÓN – MIRAGALLA - ESTACIÓN FF.CC. (GUIXAR)'}
		]);
	}

	addFavStop (req, res) {
		res.end();
	}

	addFavLine (req, res) {
		console.log(req.body);
		res.json({ok: true, id: req.body.id});
	}

	deleteFavStop (req, res) {
		res.end();
	}

	deleteFavLine (req, res) {
		console.log('delete', req.body);
		res.json({ok: true, id: req.body.id});
	}

	deleteUser (req, res) {
		res.end();
	}

	logout (req, res) {
		req.logout();
		res.redirect('/#/');
	}
}

module.exports = user;
