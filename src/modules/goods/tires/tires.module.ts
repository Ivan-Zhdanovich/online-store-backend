import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tire } from './entities/tire.entity';
import { TiresController } from './tires.controller';
import { TiresService } from './tires.service';
import { TiresRepository } from './repositories/tires.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tire])],
  controllers: [TiresController],
  providers: [TiresService, TiresRepository],
  exports: [TiresService],
})
export class TiresModule {}
