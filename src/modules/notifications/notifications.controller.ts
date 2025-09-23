import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  createNotification(@Request() req, @Body('message') message: string) {
    const userId: number = req.user.id;
    return this.notificationsService.createInAppNotification(userId, message);
  }

  @Get()
  getNotifications(@Request() req) {
    const userId: number = req.user.id;
    return this.notificationsService.getNotifications(userId);
  }

  @Patch(':notificationId')
  markAsRead(@Param('notificationId', ParseIntPipe) notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
