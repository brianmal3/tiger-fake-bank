import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomResponse } from './models/custom_response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getFakeFNBBatchTransactions')
  async getFakeFNBBatchTransactions(): Promise<CustomResponse> {
    let list = [];
    try { 
      return this.appService.getFakeFNBBatchTransactions();
    } catch (e) {
      return {
        status: 500,
        message: `getFakeFNBBatchTransactions failed: ${e}`,
        list: []
      }
    }
  }
}
