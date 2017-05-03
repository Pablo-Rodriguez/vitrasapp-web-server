
const util = require('../util');
const config = require('../../config');

class user {
    constructor (client) {
        this.client = client;
    }

    create (body) {
        console.log(body)
        return util.request(this.client, 'incluirUsuario', {
            usuario: body.username,
            nombre: body.name,
            apellidos: body.second,
            dni: body.dni,
            email: body.email,
            telf: body.phone,
            passw: body.password
        })
        .then((result) => (config.crypto.db ? util.decode(result) : result))
        .then((result) => {
            if (result.return !== 'true') {
                throw 'Error al crear el usuario ' + body.username;
            } else {
                return;
            }
        })
    }

    getUser (usuario) {
        return util.request(this.client, 'ver_mis_datos', {usuario: usuario})
        .then((user) => user.datos)
        .then((user) => (config.crypto.db ? util.decode(user) : user))
        .then((user) => this.fixUser(user))
    }

    fixUser (user) {
        return {
            username: user.usuario,
            name: user.nombre,
            second: user.apellidos,
            dni: user.dni,
            email: user.email,
            phone: user.telf
        }
    }
}

module.exports = user;
