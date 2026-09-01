import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart_items/cart_items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alpha',
      database: 'store',
      entities: [User],
      synchronize: false,
      logging: true,
      migrations: ['/migrations/**/*.ts'],
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    CartModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
