
const passport = require('passport');
const Model = require('../business/user');

class user {
	constructor (rex) {
        this.model = new Model(rex.getPlugin('user'));
		rex.post('/usuarios/signin', this.newUser.bind(this));
		rex.post('/usuarios/login', passport.authenticate('local', {
			successRedirect: '/#/perfil',
			failureRedirect: '/#/'
		}));
		rex.get('/usuarios/perfil', 'auth', this.get);
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

	logout (req, res) {
		req.logout();
		res.redirect('/#/');
	}
}

module.exports = user;
