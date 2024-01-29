import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', length: 100, nullable: false })
  title: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'when', type: 'date', nullable: false })
  date: Date;

  @Column({ name: 'address', length: 255, nullable: false })
  localization: string;

  @Column({ name: 'createdAt', type: 'date', nullable: false })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.events)
  organizator: User;
}
