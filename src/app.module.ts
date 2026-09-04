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
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart_items/cart-item.entity';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { Order_item } from './order_items/order_items.entity';
import { Category } from './category/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alpha',
      database: 'store',
      entities: [User, Cart, CartItem, Product, Order, Order_item, Category],
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
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
