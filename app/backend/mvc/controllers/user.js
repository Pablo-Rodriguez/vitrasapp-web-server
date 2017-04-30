
const passport = require('passport');
const Model = require('../business/user');

class user {
	constructor (rex) {
        this.model = new Model(rex.getPlugin('user'));
		rex.post('/usuarios/signin', this.newUser.bind(this));
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
		// TODO -> Crear usuario en el servicio externo
		this.model.create(req.body);
		res.redirect('/#/perfil');
	}

	get (req, res) {
		// TODO -> devolver perfil cuando este conectado el servicio
		res.json({
			username: 'pablo',
			name: 'Pablo',
			second: 'Rodriguez',
			dni: '12121212a',
			email: 'asd@gmail.com',
			phone: '654234234'
		});
	}

	favStops (req, res) {
		res.end();
	}

	favLines (req, res) {
		res.end();
	}

	addFavStop (req, res) {
		res.end();
	}

	addFavLine (req, res) {
		console.log(req.body);
		res.json({ok: true});
	}

	deleteFavStop (req, res) {
		res.end();
	}

	deleteFavLine (req, res) {
		res.end();
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
