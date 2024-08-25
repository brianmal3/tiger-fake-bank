"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const transaction_entity_1 = require("./models/transaction.entity");
const crypto_1 = require("crypto");
const custom_response_1 = require("./models/custom_response");
const tag = '🍏 🍏 🍏 🍏 🍏 AppService 🍏 🍏';
const logger = new common_1.Logger(tag);
let AppService = class AppService {
    getHello() {
        return '🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 This is a fake bank!';
    }
    async getFakeFNBBatchTransactions() {
        const num = (0, crypto_1.randomInt)(12);
        const batchId = new Date().getTime() + (0, crypto_1.randomInt)(999);
        logger.log(`${tag} getFakeFNBBatchTransactions starting ...`);
        if (num == 0) {
            logger.log(`Returning zero transactions for batch ${batchId}}`);
            return new custom_response_1.CustomResponse(200, `Returning zero transactions for batch ${batchId}}`, []);
        }
        if (num > 9) {
            const msg = `👿👿👿 Random Error thrown! 👿👿👿`;
            logger.error(`\n\n${msg} \n\n`);
            return new custom_response_1.CustomResponse(500, msg, []);
        }
        let count = (0, crypto_1.randomInt)(25);
        if (count == 0) {
            count = 1;
        }
        let list = [];
        for (let index = 0; index < count; index++) {
            const tx = new transaction_entity_1.Transaction();
            tx.id = new Date().getTime() + (0, crypto_1.randomInt)(999);
            tx.amount = (0, crypto_1.randomInt)(1000000);
            const randomNumber = Math.round((Math.random() * 1000000) / 1000) * 1000;
            tx.amount = randomNumber;
            if (tx.amount < 1000) {
                tx.amount = 1000;
            }
            tx.batch_id = batchId;
            tx.booking_date = new Date().toISOString();
            tx.value_date = new Date().toISOString();
            tx.credit_debit_indicator = 'C';
            tx.posted = false;
            tx.remittance_info = 'Remittance info';
            tx.transaction_id = `${new Date().getTime() + (0, crypto_1.randomInt)(999)}`;
            tx.reference = `Reference ${index}`;
            let disc = (0, crypto_1.randomInt)(10);
            tx.discount = disc;
            list.push(tx);
        }
        list.forEach((tx) => {
            logger.log(`Transaction, id: ${tx.id} 🍎 amount: ${tx.amount}`);
        });
        logger.log(`... Returning ${list.length} transactions for batch ${batchId}}\n\n`);
        return new custom_response_1.CustomResponse(200, `Returning ${list.length} transactions for batch ${batchId}`, list);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map