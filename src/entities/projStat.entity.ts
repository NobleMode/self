import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Status } from './status.entity';
import { Member } from './member.entity';

@Entity()
export class ProjStat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (proj) => proj.projectID)
    project: string;

    @ManyToOne(() => Member, (mem) => mem.rollno)
    head: string;

    @ManyToOne(() => Status, (stat) => stat.statusID)
    status: number;
}