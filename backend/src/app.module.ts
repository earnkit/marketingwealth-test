import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { TestModule } from './test/test.module';


@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '3164',
    database: 'db_test',
    entities: [Order],
    synchronize: true,
    charset: 'utf8', 
  }), OrderModule, TestModule, 
],
})
export class AppModule {}
