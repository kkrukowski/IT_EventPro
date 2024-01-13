import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'when', type: 'date', nullable: false })
  when: Date;

  @Column({ name: 'address', length: 255, nullable: false })
  address: string;

  @Column({ name: 'createdAt', type: 'date', nullable: false })
  createdAt: Date;

  @OneToOne(() => User)
  owner: User;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'participantsId' })
  participants: User[];
}
