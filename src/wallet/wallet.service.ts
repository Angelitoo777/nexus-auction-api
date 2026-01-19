import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletTransactionRepository } from './walletTransactions.repository';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletService {
  constructor(
    private sequelize: Sequelize,
    private walletRepository: WalletRepository,
    private transactionsRepository: WalletTransactionRepository,
  ) {}

  async deposit(userId: string | undefined, amount: number) {
    const t = await this.sequelize.transaction();

    if (!userId) {
      throw new Error('User ID es requerido para el deposito');
    }

    try {
      const wallet = await this.walletRepository.findByUserId(userId);

      if (!wallet) {
        throw new Error('Cartera no encontrada para el usuario');
      }

      const newBalance = Number(wallet?.balance) + amount;

      await this.walletRepository.updateBalance(wallet?.id, newBalance, t);

      await this.transactionsRepository.create(
        {
          wallet_id: wallet?.id,
          amount,
          type: 'deposit',
          reference_id: 'external',
        },
        t,
      );

      await t.commit();

      return { message: 'Deposito exitoso', newBalance };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async createWallet(userId: string, t: Transaction) {
    return this.walletRepository.create(userId, t);
  }
}
