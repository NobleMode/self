import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Work } from "./work.entity";

@Entity()
export class Priority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number;

    @Column()
    tag: string;

    @OneToMany(() => Work, (work) => work.priority)
    workPriority: number[];
}