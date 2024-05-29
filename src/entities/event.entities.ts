import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 8, nullable: false})
    codename: string

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: true})
    description: string

    @Column({type: "bool", nullable: true})
    status: boolean
}