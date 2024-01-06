import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;

  @Column({ name: 'when', type: 'date', nullable: false })
  when: Date;

  @Column({ name: 'address', length: 255, nullable: false })
  address: string;

  @Column({ name: 'createdAt', type: 'date', nullable: false })
  createdAt: Date;
}
