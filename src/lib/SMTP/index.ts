import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { MailParams } from "./types";
import { activation } from "./templates/activation";
export async function sendMail({ to, subject, body }: MailParams) {
  const { SMTP_USER, SMTP_PASS, SMPT_EMAIL } = process.env;
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  try {
    try {
      const testResult = await transport.verify();
      console.log("Test Result Of Transport", testResult);
    } catch (e) {
      console.log(e);
    }

    try {
      const sendResult = await transport.sendMail({
        from: SMPT_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log({ sendResult });
      return sendResult;
    } catch (e) {
      console.log(e);
    }
  } catch (error) {}
}

export const compileEmailActivationTemplate = (name: string, url: string) => {
  const template = Handlebars.compile(activation);
  const htmlBody = template({ name, url });
  return htmlBody;
};
