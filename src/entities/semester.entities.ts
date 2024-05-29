import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}