import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { Role } from './role.entity';
import { SemsActive } from './semsActive.entity';
import { EventActive } from './eventActive.entity';
import { Work } from './work.entity';
import { ProjStat } from './projStat.entity';
import { User } from './user.entity';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rollno: string;

    @Column()
    name: string;

    @Column()
    gen: number;
    
    @Column()
    khoa: number;

    @Column()
    dob: Date;

    @Column()
    email: string; 

    @Column()
    phone: string;

    @ManyToOne(() => Department, (dept) => dept.deptID)
    department: string;

    @ManyToOne(() => Role, (role) => role.roleID)
    role: string;

    @Column()
    address: string;

    @Column()
    fblink: string;

    @OneToMany(() => SemsActive, (sa) => sa.member)
    semMember: string[];

    @OneToMany(() => EventActive, (ea) => ea.memID)
    eaMember: string[];

    @OneToMany(() => Work, (w) => w.head)
    workHead: string[];

    @OneToMany(() => ProjStat, (ps) => ps.head)
    psHead: string[];

    @OneToOne(() => User, (u) => u.email)
    usermail: string[];
}