import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Products } from 'src/products/entities/product.entity';
import { WalletTransactions } from 'src/wallet/entities/wallet_transactions.entity';

interface AuctionAttributes {
  id: string;
  productId: string;
  startingPrice: number;
  currentPrice: number;
  endTime: Date;
  status: string;
}

export type AuctionCreationAttributes = Optional<
  AuctionAttributes,
  'id' | 'currentPrice' | 'status'
>;

@Table({ tableName: 'auctions', timestamps: false })
export class Auction extends Model<
  AuctionAttributes,
  AuctionCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  startingPrice: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  currentPrice: number;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  endTime: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  })
  status: string;

  @HasMany(() => WalletTransactions)
  wallet_transactions: WalletTransactions[];
}
