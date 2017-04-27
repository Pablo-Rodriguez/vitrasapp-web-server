
const Model = require('../models/user');

class user {
	constructor (rex) {
        this.model = new Model(rex.getPlugin('user'));
	}
}

module.exports = user;
