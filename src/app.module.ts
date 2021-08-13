import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .envがどこでも使えるようになる
      load: [ormConfig],
      expandVariables: true // .envで変数が使えるようになる
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
