import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { User } from 'src/users/entities/user.entity';
import { WalletTransactions } from './wallet_transactions.entity';

interface WalletAttributes {
  id: string;
  user_id: string;
  balance: number;
  locked_balance: number;
  currency: string;
}

export type WalletCreationAttributes = Optional<
  WalletAttributes,
  'id' | 'balance' | 'locked_balance'
>;

@Table({ tableName: 'wallets', timestamps: false })
export class Wallet extends Model<WalletAttributes, WalletCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  user_id: string;

  @Column({
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0,
  })
  balance: number;

  @Column({
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0,
  })
  locked_balance: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  currency: string;

  @HasMany(() => WalletTransactions)
  wallet_transactions: WalletTransactions[];
}
