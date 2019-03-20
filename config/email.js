const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
    }
});

module.exports = {
        sendMail: function (recipient, html){
            let mailOptions = {
                from: 'autgadget@gmail.com', // sender address
                to: recipient,
                subject: "Eszköz kölcsönzés", // Subject line
                html: html
            };

            transporter.sendMail(mailOptions, function(err, data) {
                if(err) {
                    console.log('Hiba történt az email küldése közben: ', err);
                }
                else {
                    console.log('Email sikeresen elküldve');
                }
            });
        }
  }
