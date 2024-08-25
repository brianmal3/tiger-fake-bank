import { CustomResponse } from './models/custom_response';
export declare class AppService {
    getHello(): string;
    getFakeFNBBatchTransactions(): Promise<CustomResponse>;
}
