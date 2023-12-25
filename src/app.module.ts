import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database/database.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
