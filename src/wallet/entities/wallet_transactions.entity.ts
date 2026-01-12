import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Auction } from 'src/auctions/entities/auction.entity';

interface WalletTransactionsAttributes {
  id: string;
  wallet_id: string;
  amount: number;
  type: string;
  reference_id: string;
  created_at: Date;
}

export type WalletTransactionsCreationAttributes = Optional<
  WalletTransactionsAttributes,
  'id' | 'created_at'
>;

@Table({ tableName: 'wallet_transactions', timestamps: false })
export class WalletTransactions extends Model<
  WalletTransactionsAttributes,
  WalletTransactionsCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  wallet_id: string;

  @Column({
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  type: string;

  @ForeignKey(() => Auction)
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  reference_id: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  created_at: Date;
}
