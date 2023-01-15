const nodemailer = require("nodemailer");

const config = require("../config");
const logger = require("../log/winston");

class MailSender {
  constructor() {
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'janelle3@ethereal.email',
        pass: 'xNZbKvEq5QAbf3AK3K'
      }
    });

  }

  async send(template, email, firstName) {
    const mailOptions = {
      from: "<no-reply@ecommerce.com>",
      to: email, 
      subject: `Nuevo pedido de ${firstName}, ${email}`, 
      text: "Pedido realizado con exito", 
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info("Mail enviado, id:" + response.messageId);
  }

  async aNewUserMail(template) {
    const mailOptions = {
      to: config.mail.GMAIL_ADDRESS, 
      subject: `Nuevo usuario registrado`,
      text: `Se ha registrado un nuevo usuario con exito`,
      html: template 
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info(response.envelope);
  }
}

module.exports = new MailSender();
