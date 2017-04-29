
class user {
    constructor (client) {
        this.client = client;
    }

    create (body) {
        console.log(body);
    }
}

module.exports = user;
