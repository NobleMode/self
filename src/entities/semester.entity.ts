import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SemsActive } from './semsActive.entity';

@Entity()
export class Semester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    semsID: string;

    @Column()
    name: string;

    @OneToMany(() => SemsActive, (sa) => sa.semester)
    saSems: string[];
}