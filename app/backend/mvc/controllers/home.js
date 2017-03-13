
class home {
	constructor (rex) {
		//rex.get('/', this.get);
	}

	get (req, res) {
		res.render('index');
	}
}

module.exports = home;
