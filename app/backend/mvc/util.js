
const toJS = require('xml2js').parseString;
const base64 = require('base64-js');
const MCrypt = require('mcrypt').MCrypt;
const config = require('../config');

module.exports = {
    sendJSON (res, promise) {
        promise.then((json) => {
            res.json(json);
        }).catch((err) => {
            if (config.debug) {
                console.log(err);
            }
            res.sendStatus(404);
        });
    },
    request (client, method, args) {
        args = args || {};
        return new Promise((resolve, reject) => {
            client[method](args, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    parseXML (attr) {
        return (xml) => {
            return new Promise((resolve, reject) => {
                xml = (attr != null ? xml[attr] : xml);
                toJS(xml, function (err, json) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(json);
                    }
                });
            });
        }
    },
    decodeString (str) {
        let desCipher = new MCrypt('des', 'ecb');
        desCipher.open(new Buffer('x3PswpFXdpE=', 'base64'));
        return desCipher.decrypt(new Buffer(str, 'base64')).toString().replace(/[^A-záéíóúÁÉÍÓÚ0-9_-\sñ@\.\/:]+/g, '');
    },
    decode (obj) {
        for (let name in obj) {
            if (typeof obj[name] === 'object') {
                obj[name] = this.decode(obj[name]);
            } else {
                obj[name] = this.decodeString(obj[name]);
            }
        }
        return obj;
    }
};
