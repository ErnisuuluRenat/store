import { Controller, Get, Param, ParseFloatPipe, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("pipe/:num")
  async getPipe(@Param('num', ParseIntPipe) num : number) {
    return num
  }
}
