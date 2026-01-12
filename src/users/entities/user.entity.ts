import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Products } from 'src/products/entities/product.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  rol: string;
}
export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'rol'>;

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  })
  rol: string;

  @HasMany(() => Products)
  products: Products[];

  @HasMany(() => Wallet)
  wallets: Wallet[];
}
