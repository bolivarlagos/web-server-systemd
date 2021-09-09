const fs = require('fs')
const { accessFile, errorFile, accessFolder, errorFolder } = require('./utils')


const formatDate = () => {
    return new Date().toISOString().replace('T', ' ').replace(/\..+/, '') + '\n'
}


const formatDoc = (method, url) => {
    return 'info: ' + method + ' ' + url + ' time: ' + formatDate()
}

const createLogs = (folder, file, url, method) => {
    if(fs.existsSync(file)){
        fs.appendFileSync(file, formatDoc(method, url))
    } else {
        fs.mkdirSync(folder, { recursive: true })
        fs.writeFileSync(file, formatDoc(method, url))
    } 

}


module.exports.handleLogs = (...args) => {
    const { url, method } = args[0]    
    createLogs(accessFolder, accessFile, url, method)    
}

module.exports.handleErrorLogs = (...args) => {
    const { url, method } = args[0]
    createLogs(errorFolder, errorFile, url, method)  
}

