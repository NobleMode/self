import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventActive } from './eventActive.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventID: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => EventActive, (ea) => ea.eventID)
    eventActive: string[];
}