import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController]
})
export class OrdersModule {}
