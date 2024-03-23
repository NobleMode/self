import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Status } from './status.entity';
import { Member } from './member.entity';
import { Event } from './event.entity';

@Entity()
export class EventActive {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (mem) => mem.rollno)
    memID: string;

    @ManyToOne(() => Event, (event) => event.eventID)
    eventID: string;

    @ManyToOne(() => Status, (stat) => stat.statusID)
    status: string;

    @Column()
    note: string;
} 