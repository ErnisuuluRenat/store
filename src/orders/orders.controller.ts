import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService : OrdersService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async checkout(@Request() req) {
        return this.ordersService.checkout(req.user.userId)
    }
}
