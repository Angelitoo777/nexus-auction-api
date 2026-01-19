import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  WalletTransactions,
  WalletTransactionsCreationAttributes,
} from './entities/wallet_transactions.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletTransactionRepository {
  constructor(
    @InjectModel(WalletTransactions)
    private readonly transactionModel: typeof WalletTransactions,
  ) {}

  async create(
    data: WalletTransactionsCreationAttributes,
    transaction?: Transaction,
  ) {
    return await this.transactionModel.create(data, { transaction });
  }

  async findAllByWalletId(walletId: string) {
    return await this.transactionModel.findAll({
      where: { wallet_id: walletId },
      order: [['created_at', 'DESC']],
    });
  }
}
