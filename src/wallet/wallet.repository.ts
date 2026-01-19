import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { ModelCtor } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletRepository {
  constructor(@InjectModel(Wallet) private walletModel: ModelCtor<Wallet>) {}

  async findByUserId(userId: string): Promise<Wallet | null> {
    return await this.walletModel.findOne({ where: { user_id: userId } });
  }

  async create(userId: string, transaction?: Transaction): Promise<Wallet> {
    return await this.walletModel.create(
      { user_id: userId, currency: 'USD' },
      { transaction },
    );
  }

  // Se utliza esto como metodo para agregar balance debido a que no se ha hecho integracion con pasarela de pago
  async updateBalance(
    walletId: string,
    balance: number,
    transaction?: Transaction,
  ): Promise<Wallet> {
    await this.walletModel.update(
      { balance },
      { where: { id: walletId }, transaction },
    );

    const updatedWallet = await this.walletModel.findByPk(walletId);

    if (!updatedWallet) {
      throw new Error('Cartera no encontrada');
    }

    return updatedWallet;
  }
}
