import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';

export const databaseConfig: TypeOrmModule = {
  type: 'sqlite',
  database: '.db/data.sqlite3',
  synchronize: true,
  entities: [Event],
};
