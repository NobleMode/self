import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SemsActive } from "./semactive.entities";

@Entity('semester')
export class Semester {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 4, nullable: false})
    codename: string

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "bool", nullable: false})
    status: boolean

    @OneToMany(() => SemsActive, (se) => se.semester)
    semsActive: SemsActive[]
}