import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'membersId' })
  members: User[];
}
