import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './modules/users/module.module';
import { UsersModule } from './modules/users/users.module';
import { UsersModule } from './users/modules/users/users.module';
import { Service } from './modules/users/users.service';

@Module({
  imports: [ModuleModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, Service],
})
export class AppModule {}
