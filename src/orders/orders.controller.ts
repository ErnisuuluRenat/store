import { Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService : OrdersService) {}
    @UseGuards(JwtAuthGuard)
    @Post("/checkout")
    async checkout(@Request() req) {
        return this.ordersService.checkout(req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getOrder(@Param("id", ParseIntPipe)
     id : number, @Request() req){
        return this.ordersService.getOrder(id, req.user.userId)
    }
}
