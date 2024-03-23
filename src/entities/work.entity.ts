import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { Status } from './status.entity';
import { Member } from './member.entity';
import { Priority } from './priority.entity';
import { WorkStatus } from './workStatus.entity';

@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobID: number;

    @ManyToOne(() => WorkStatus, (stat) => stat.level)
    status: number;

    @ManyToOne(() => Member, (mem) => mem.rollno)
    head: string;

    @Column()
    deadline: Date;

    @ManyToOne(() => Department, (dept) => dept.deptID)
    dept: string;

    @ManyToOne(() => Priority, (prio) => prio.level)
    priority: number;

    @Column()
    startdate: Date;
}