import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // test test
    return 'Hello World!';
  }
}
