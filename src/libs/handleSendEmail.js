import nodemailer from "nodemailer";
import { MAILTRAP, URL_FRONTEND } from "../config/index.js";
import { templateEmail } from "../views/templateEmail.js";

export function sendEmail(email, token) {
  const mail = nodemailer.createTransport({
    host: MAILTRAP.MAIL_HOST,
    port: MAILTRAP.MAIL_PORT,
    auth: {
      user: MAILTRAP.MAIL_USER,
      pass: MAILTRAP.MAIL_PASS,
    },
  });

  const url = `${URL_FRONTEND}/recovery-password?token=${token}`;

  const mailOptions = {
    from: "Dashboard Server <support_dashboard@gmail.com>",
    to: email,
    subject: "Enlace para restablecer la contraseña - Dashboard",
    html: templateEmail(url),
  };

  mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(1);
      return 1;
    } else {
      console.log(0);
      return 0;
    }
  });
}
