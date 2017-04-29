
const Strategy = require('passport-local');

module.exports = (passport) => {
    passport.use(new Strategy((name, pass, done) => {
        // Cambiar cuando el servicio de base de datos este integrado
        if (name === 'user' && pass === 'password') {
            done(null, {username: name});
        } else {
            done(null, false);
        }
    }));
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((username, done) => {
        done(null, {username: username});
    });
};
