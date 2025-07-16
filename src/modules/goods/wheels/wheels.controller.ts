import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { WheelsService } from './wheels.service';
import { CreateWheelDTO } from './dto/create-wheel/create-wheel-dto';
import { WheelDTO } from './dto/wheel/weel-dto';
import { UpdatePropertiesWheelDTO } from './dto/update-pproperties-wheel/update-properties-wheel-dto';

@Controller('wheels')
export class WheelsController {
  constructor(private wheelsService: WheelsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() wheel: CreateWheelDTO): Promise<WheelDTO | void> {
    return await this.wheelsService.create(wheel);
  }

  @Get()
  getWheels(): Promise<WheelDTO[]> {
    return this.wheelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WheelDTO> {
    return this.wheelsService.findOneById(id);
  }

  @Put(':id')
  updateWheel(
    @Body() wheel: CreateWheelDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateWheelDTO> {
    return this.wheelsService.update(id, wheel);
  }

  @Patch(':id')
  updateWheelProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() wheelProperties: UpdatePropertiesWheelDTO,
  ) {
    return this.wheelsService.update(id, wheelProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteWheel(@Param('id', ParseIntPipe) id: number) {
    return this.wheelsService.remove(id);
  }

  @Delete('softDelete/:id')
  @HttpCode(204)
  softDeleteWheel(@Param('id', ParseIntPipe) id: number) {
    return this.wheelsService.softRemove(id);
  }
}
