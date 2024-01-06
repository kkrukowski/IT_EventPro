import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';

export const databaseConfig: TypeOrmModule = {
  type: 'better-sqlite3',
  database: '.db/data.db',
  synchronize: true,
  entities: [Event],
};
