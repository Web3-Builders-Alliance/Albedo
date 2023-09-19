import sgMail from '@sendgrid/mail';

require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const msg = {
    to,
    from: 'Kellenkjames@gmail.com', // Replace this with your own email
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};