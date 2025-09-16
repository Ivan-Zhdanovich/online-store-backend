import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;
  private twilioClient: Twilio.Twilio;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    this.twilioClient = Twilio('ACCOUNT_SID', 'AUTH_TOKEN');
  }

  async sendOrderConfirmation(email: string, orderId: number) {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Order information',
      text: `Your order with ${orderId} has been confirmed.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendShippingUpdate(email: string, orderId: number, status: string) {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Shipping Update',
      text: `Your order with ID ${orderId} is now ${status}.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOrderConfirmationSMS(phone: string, orderId: number) {
    await this.twilioClient.messages.create({
      body: `Your order with ID ${orderId} has been confirmed`,
      from: '+1234567890',
      to: phone,
    });
  }

  async sendShippingUpdateSMS(phone: string, orderId: number, status: string) {
    await this.twilioClient.messages.create({
      body: `Your order with ID ${orderId} has been confirmed.`,
      from: '_1234567890',
      to: phone,
    });
  }
}
