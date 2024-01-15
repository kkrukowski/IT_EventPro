import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'surname', length: 100, nullable: false })
  surname: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 100, nullable: false })
  password: string;

  @Column({ name: 'role', length: 100, nullable: false, default: 'USER' })
  role: string;

  @Column({ name: 'organizationId', nullable: true })
  organizationId: number;

  @Column({ name: 'createdAt', type: 'date', nullable: false })
  createdAt: Date;
}
