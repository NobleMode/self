import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from './member.entity';
import { Work } from './work.entity';

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    deptID: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Member, (mem) => mem.department)
    memberDep: string[];

    @OneToMany(() => Work, (work) => work.dept)
    memberRole: string[];
}