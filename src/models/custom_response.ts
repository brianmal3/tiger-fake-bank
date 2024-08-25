
export class CustomResponse {
    constructor(status: number, message: string, list: any[]){
        this.status = status;
        this.message = message;
        this.list = list;
    }
    status: number;
    message: string;
    list: any[]
}