import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from './models/transaction.entity';
import { randomInt } from 'crypto';
import { CustomResponse } from './models/custom_response';
const tag = '🍏 🍏 🍏 🍏 🍏 AppService 🍏 🍏';
const logger = new Logger(tag);
@Injectable()
export class AppService {
  getHello(): string {
    return '🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 This is a fake bank!';
  }

  async getFakeFNBBatchTransactions(): Promise<CustomResponse> {
    const num = randomInt(12);
    const batchId = new Date().getTime() + randomInt(999);
    logger.log(`${tag} getFakeFNBBatchTransactions starting ...`);

    //return no transactions if 0
    if (num == 0) {
      logger.log(`Returning zero transactions for batch ${batchId}}`);
      return new CustomResponse(200, `Returning zero transactions for batch ${batchId}}`, []);
    }

    //throw Error randomly
    if (num > 9) {
      const msg = `👿👿👿 Random Error thrown! 👿👿👿`;
      logger.error(`\n\n${msg} \n\n`);
      return new CustomResponse(500, msg, []);
    }


    //generate random number of transactions
    let count = randomInt(16);
    if (count == 0) {
      count = 1;
    }
    let list: any[] = [];

    for (let index = 0; index < count; index++) {
      const tx = new Transaction();
      tx.id = new Date().getTime() + randomInt(999);
      tx.amount = randomInt(1000000);
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
      tx.transaction_id = `${new Date().getTime() + randomInt(999)}`;
      tx.reference = `Reference ${index}`;
      let disc = randomInt(10);
      tx.discount = disc;
      list.push(tx);
    }

    list.forEach((tx) => {
      logger.log(`Transaction, id: ${tx.id} 🍎 amount: ${tx.amount}`);
    });
    logger.log(`... Returning ${list.length} transactions for batch ${batchId}}\n\n`);
    return new CustomResponse(200, `Returning ${list.length} transactions for batch ${batchId}`, list);
  }
}
