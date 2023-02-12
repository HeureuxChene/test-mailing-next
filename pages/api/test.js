import nodemailer from 'nodemailer';

export default async function handler (req, res) {

    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,
        secure: true,
        auth: {
            user: "contact@seven-driver-riviera.com",
            pass: "MotDePasseTemporaire*!66",
        }
    });
    
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const optionsClient = {
        from: `Seven Driver Riviera <contact@seven-driver-riviera.com>`,
        to: 'thaonjulien@gmail.com',
        subject: 'Seven Driver Riviera - Formulaire',
        html: 'TEST SITE'
    }
    
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(optionsClient, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    res.status(200).json({ status: "OK" });
}