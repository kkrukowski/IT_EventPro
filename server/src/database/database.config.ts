import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';

export const databaseConfig: TypeOrmModule = {
  type: 'better-sqlite3',
  database: '.db/data.db',
  synchronize: true,
  entities: [Event, User],
};
