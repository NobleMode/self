import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjStat } from './projStat.entity';
import { SemsActive } from './semsActive.entity';
import { EventActive } from './eventActive.entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    statusID: number;

    @Column()
    name: string;

    @OneToMany(() => ProjStat, (pj) => pj.status)
    projStat: string[];

    @OneToMany(() => SemsActive, (sa) => sa.status)
    semsActive: string[];

    @OneToMany(() => EventActive, (ea) => ea.status)
    eventActive: string[];
}