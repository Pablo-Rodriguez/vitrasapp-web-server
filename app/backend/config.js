
module.exports = {
    port: 5000,
    debug: false,
    wsdls: {
        juddi: 'http://172.19.128.184:8080/juddiv3/services/inquiry?wsdl',
        vitrasa: 'http://sira.intecoingenieria.com/SWEstimacionParada.asmx?WSDL'
    },
    business: {
        name: 'VitrasApp'
    },
    services: {
        vitrasa: 'vitrasa',
        db: 'BaseDatos',
        places: 'Places',
        rutes: 'Scraper'
    },
    crypto: {
        rutes: false,
        places: false,
        db: true,
        vitrasa: false
    }
};
