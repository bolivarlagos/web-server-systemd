require('dotenv').config()

const utils = {
    home: __dirname + '/index.html',
    docsFolder: __dirname + '/docs/',
    port: 3000,
    listening: () => console.log('listening on port ' + utils.port),
    html: { 'Content-Type': 'text/html' },    
    mailAddressConf: process.env.EMAIL, 
    mailServiceConf: process.env.SMTP, 
    mailPassConf: process.env.PASSWORD, 
    mailPortConf: process.env.PORT
}

module.exports = utils 