import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wheel } from './entities/wheel.entity';
import { WheelsController } from './wheels.controller';
import { WheelsService } from './wheels.service';
import { WheelsRepository } from './repositories/wheels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wheel])],
  controllers: [WheelsController],
  providers: [WheelsService, WheelsRepository],
  exports: [WheelsService],
})
export class WheelsModule {}
