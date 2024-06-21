import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entities";
import { Event } from "./event.entities";

@Entity('EventActive')
export class EventActive {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (m) => m.rollno)
    member: Member;

    @ManyToOne(() => Event, (e) => e.id)
    event: Event;

    @Column({type: "boolean", default: false})
    status: boolean;

    @Column({type: "date", nullable: false})
    signdate: Date;

    @Column({type: "varchar", nullable: true})
    notes: string;
}