import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.DB_HOST)
    console.log(process.env.SUPPORT_EMAIL)
    return 'Hello Worldaaa!';
  }
}
