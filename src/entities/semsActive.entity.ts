import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Semester } from './semester.entity';
import { Status } from './status.entity';
import { Member } from './member.entity';

@Entity()
export class SemsActive {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (mem) => mem.rollno)
    member: string;

    @ManyToOne(() => Semester, (sems) => sems.semsID)
    semester: string;

    @ManyToOne(() => Status, (stat) => stat.statusID)
    status: number;

    @Column()
    note: string;
}