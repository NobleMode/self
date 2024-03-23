import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Work } from './work.entity';

@Entity()
export class WorkStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number;

    @Column()
    tag: string;

    @OneToMany(() => Work, (work) => work.status)
    works: Work[];
}