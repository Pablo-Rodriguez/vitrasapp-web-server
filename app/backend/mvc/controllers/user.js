
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
		rex.get('/usuarios/prefil', 'auth', this.get);
		rex.get('/usuarios/logout', 'auth', this.logout);
	}

	newUser (req, res) {
		this.model.create(req.body);
	}

	get (req, res) {
		// TODO -> devolver perfil cuando este conectado el servicio
		res.end();
	}

	logout (req, res) {
		req.logout();
		res.redirect('/#/');
	}
}

module.exports = user;
