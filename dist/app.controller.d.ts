import { AppService } from './app.service';
import { CustomResponse } from './models/custom_response';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getFakeFNBBatchTransactions(): Promise<CustomResponse>;
}
