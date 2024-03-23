import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roleID: string;

    @Column()
    name: string

    @OneToMany(() => Member, (mem) => mem.role)
    memberRole: string[];
}