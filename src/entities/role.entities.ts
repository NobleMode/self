import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from './member.entities';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: true})
    description: string;

    @Column({type: "varchar", nullable: false})
    permissions: string;

    @OneToMany(() => Member, (m) => m.role)
    members: Member[];
}