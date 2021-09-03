const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

const mailSender = require('./mailSender')
const { home, docsFolder, port, listening, html } = require('./utils')

const requestListener = (req, res) => {

    if(req.url === '/'){

        fs.readFile(home, (err, data) => {

            if(err) throw new Error(err)
            res.writeHead(200, html)
            res.end(data)
        })
    }
    else if(req.url === '/upload'){

        const form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            
            if(err) throw new Error(err)
            if(files.attachment.size === 0) throw new Error('Must upload a file')

            mailSender(fields, files)

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
        res.end('Error')
    }
}

const server = http.createServer(requestListener)
server.listen(port, listening)