require('dotenv').config()

const utils = {
    home: __dirname + '/index.html',
    docsFolder: __dirname + '/docs/',
    logsFolder: __dirname + '/logs/',
    accessFolder: __dirname + '/logs/access/',
    errorFolder: __dirname + '/logs/errors/',
    accessFile: __dirname + '/logs/access/' + 'access.log',
    errorFile: __dirname + '/logs/errors/' + 'error.log',
    port: 3000,
    listening: () => console.log('listening on port ' + utils.port),
    html: { 'Content-Type': 'text/html' },    
    mailAddressConf: process.env.EMAIL, 
    mailServiceConf: process.env.SMTP, 
    mailPassConf: process.env.PASSWORD, 
    mailPortConf: process.env.PORT
}

module.exports = utils 