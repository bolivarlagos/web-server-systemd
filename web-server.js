const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

const mailSender = require('./mailSender')
const { home, docsFolder, port, listening, html } = require('./utils')
const { handleLogs, handleErrorLogs } = require('./fileHandlers')

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

const requestListener = (req, res) => {

    if(req.url === '/'){

        fs.readFile(home, (err, data) => {

            if(err) throw new Error(err)
            res.writeHead(200, html)
            customEmitter.emit('success', req)
            res.end(data)
        })
    }
    else if(req.url === '/upload'){

        const form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            
            if(err) throw new Error(err)
            if(files.attachment.size === 0) throw new Error('Must upload a file')

            mailSender(fields, files)

            if(fs.existsSync(docsFolder)){
                console.log('This directory alread exists')                
            } else {
                fs.mkdirSync(docsFolder)
            }          

            let tempFile = files.attachment.path 
            let newFile = docsFolder + files.attachment.name 

            fs.rename(tempFile, newFile, (err) => {
                
                if(err) throw new Error(err)
                res.writeHead(200, html)
                res.end('Uploaded')
            })

        })

    }
    else {
        res.writeHead(404)
        customEmitter.emit('error', req)
        res.end('Error')
    }
}

const server = http.createServer(requestListener)
server.listen(port, listening)

customEmitter.on('success', handleLogs)
customEmitter.on('error', handleErrorLogs)