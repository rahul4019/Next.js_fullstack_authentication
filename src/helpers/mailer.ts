// domain.com/verifytoken/gjapogjawgaogpagj
// domain.com/verifytoken?token=agjaogjasgal

import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

import User from '@/models/user';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      // update verifytoken & verifytokenexpiry field
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      // update forgotPasswordToken & forgotPasswordTokenExpiry field
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = await nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: 'rahul@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'
      }?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verfiy your email' : 'reset your password'
      } or copy and paste the link in your browser. <br> ${
        process.env.DOMAIN
      }/resetpassword?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
