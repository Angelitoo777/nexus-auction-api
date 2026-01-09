import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AuctionsModule } from './auctions/auctions.module';
import { User } from './users/entities/user.entity';
import { Auction } from './auctions/entities/auction.entity';
import { Products } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        uri: configService.getOrThrow<string>('DATABASE_URL'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Products, Auction],
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    AuctionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
