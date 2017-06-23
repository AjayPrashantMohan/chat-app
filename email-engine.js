var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


function mailer(emailId,message) {
    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'volatile.chats@gmail.com',
            pass: 'VolatileChats123'
        }
    }))

    var mail = {
        from: '<volatile.chats@gmail.com>', // sender address
        to: emailId, // list of receivers
        subject: 'Your chat conversation', // Subject line
        text: message // plain text body
    };

    transport.sendMail(mail, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + JSON.stringify(response));
        }
        transport.close();
    });
}

var mailfunctions = {
        mailer:mailer
};

module.exports = mailfunctions;