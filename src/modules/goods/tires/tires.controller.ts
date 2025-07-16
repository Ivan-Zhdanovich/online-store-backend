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
import { TiresService } from './tires.service';
import { CreateTireDTO } from './dto/create-tire/create-tire-dto';
import { TireDTO } from './dto/tire/tire-dto';
import { UpdatePropertiesTireDTO } from './dto/update-properties-tire/update-properties-dto';

@Controller('tires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() tire: CreateTireDTO): Promise<TireDTO | void> {
    return await this.tiresService.create(tire);
  }

  @Get()
  getTires(): Promise<TireDTO[]> {
    return this.tiresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TireDTO> {
    return this.tiresService.findOneById(id);
  }

  @Put(':id')
  updateTire(
    @Body() tire: CreateTireDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateTireDTO> {
    return this.tiresService.update(id, tire);
  }

  @Patch(':id')
  updateTireProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() tireProperties: UpdatePropertiesTireDTO,
  ) {
    return this.tiresService.update(id, tireProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTire(@Param('id', ParseIntPipe) id: number) {
    return this.tiresService.remove(id);
  }

  @Delete('softDelete/:id')
  @HttpCode(204)
  softDeleteTire(@Param('id', ParseIntPipe) id: number) {
    return this.tiresService.softRemove(id);
  }
}
