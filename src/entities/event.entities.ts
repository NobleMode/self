import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventActive } from "./eventactive.entities";

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

    @OneToMany(() => EventActive, (ea) => ea.event)
    eventActive: EventActive[]
}