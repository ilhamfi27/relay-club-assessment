import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor() {}

  @Get()
  @Redirect('/api-docs', 307)
  getHello(): string {
    return;
  }
}
