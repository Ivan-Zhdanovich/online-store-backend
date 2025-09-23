import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import * as Twilio from 'twilio';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { NotificationsRepository } from './repositories/notifications.repository';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;
  private twilioClient: Twilio.Twilio;

  constructor(
    @InjectRepository(User)
    private readonly usersService: UsersRepository,
    @InjectRepository(Notification)
    private readonly notificationsService: NotificationsRepository,
  ) {
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
      body: `Your order with ID ${orderId} is now ${status}.`,
      from: '_1234567890',
      to: phone,
    });
  }

  async createInAppNotification(userId: number, message: string) {
    const user = await this.usersService.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationsService.create({ user, message });
    return this.notificationsService.save(notification);
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationsService.find({ where: { user: { id: userId } } });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationsService.findOne({
      where: { id: notificationId },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    return this.notificationsService.save(notification);
  }
}
