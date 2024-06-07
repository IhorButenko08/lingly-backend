import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetModule } from './set/set.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WritingEventsModule } from './set/learn/writing/writing.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    SetModule,
    WritingEventsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
