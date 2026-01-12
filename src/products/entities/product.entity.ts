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
import { Auction } from 'src/auctions/entities/auction.entity';

interface ProductsAttributes {
  id: string;
  name: string;
  description: string;
  status: string;
  ownerId: string;
}
export type ProductCreationAttributes = Optional<
  ProductsAttributes,
  'id' | 'status'
>;

@Table({ tableName: 'products', timestamps: false })
export class Products extends Model<
  ProductsAttributes,
  ProductCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  ownerId: string;

  @HasMany(() => Auction)
  auctions: Auction[];
}
