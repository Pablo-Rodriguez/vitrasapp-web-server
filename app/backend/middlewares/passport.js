
const Strategy = require('passport-local');
const util = require('../mvc/util');
const config = require('../config');

module.exports = (passport, rex) => {
    let client = rex.getPlugin(config.services.db);
    passport.use(new Strategy((name, pass, done) => {
        util.request(client, 'ver_mis_datos', {usuario: name})
        .then((user) => (config.crypto.db ? util.decode(user) : user))
        .then((user) => user.datos)
        .then((user) => {
            if (user.usuario === name && user.passw === pass) {
                delete user.passw;
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
    passport.serializeUser((user, done) => done(null, user.usuario));
    passport.deserializeUser((username, done) => {
        util.request(client, 'ver_mis_datos', {usuario: username})
        .then((user) => (config.crypto.db ? util.decode(user) : user))
        .then((user) => user.datos)
        .then((user) => {
            done(null, {username: user.usuario});
        });
    });
};
