import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/products/products.entity';
import { Order } from './orders.entity';
import { Order_item } from 'src/order_items/order_items.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Cart, Product, Order, Order_item])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
