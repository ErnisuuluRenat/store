import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    @UseGuards(JwtAuthGuard)
    @Post()
    async checkout() {
        return "nothing"
    }
}
