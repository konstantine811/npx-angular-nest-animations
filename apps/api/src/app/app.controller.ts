import { Controller, Get } from '@nestjs/common';
// services
import { AppService } from './app.service';
// models
import { Message } from '@npx-angular-nest-drum/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Message {
    return this.appService.getData();
  }
}
