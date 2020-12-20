import { Injectable } from '@nestjs/common';
import { Message } from '@npx-angular-nest-drum/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
