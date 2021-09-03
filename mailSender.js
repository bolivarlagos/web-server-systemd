const nodemailer = require('nodemailer')
const { mailAddressConf, mailServiceConf, mailPassConf, mailPortConf, docsFolder } = require('./utils')

const mailSender = (person, file) => {

    try {
        const { firstName, email, message } =  person 
        
        const emailBody = {
            from: mailAddressConf,
            to: email,
            subject: message,
            html: `<h6> ${firstName} || ${message} </h6>`,
            attachments: [
                {
                    filename: file.attachment.name,
                    path: docsFolder + file.attachment.name 
                }
            ]
        }
        
        const transport = nodemailer.createTransport({
            host: mailServiceConf,
            port: mailPortConf,
            secure: true,
            auth: {
                user: mailAddressConf,
                pass: mailPassConf
            }
        })

        transport.sendMail(emailBody, (err, info) => {
            
            if(err) throw new Error(err)

            console.log(info.response)
        })

    } catch (error) {
        console.log(error)        
    }
}

module.exports = mailSender 
