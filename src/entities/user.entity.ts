import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Member, (mem) => mem.email)
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    token: string;
}