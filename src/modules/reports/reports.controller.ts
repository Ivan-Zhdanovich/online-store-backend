import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from 'src/guards/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @Roles(RoleEnum.ADMIN)
  getSalesReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getSalesReport(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('analytics')
  @Roles(RoleEnum.ADMIN)
  getAnalytics() {
    return this.reportsService.getAnalytics();
  }
}
