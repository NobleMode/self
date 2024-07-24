import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entities";
import { Semester } from "./semester.entities";

@Entity("SemsActive")
export class SemsActive {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (m) => m.rollno, {
        onDelete: "CASCADE"
    })
    member: Member;

    @ManyToOne(() => Semester, (s) => s.id, {
        onDelete: "CASCADE"
    })
    semester: Semester;

    @Column({type: "boolean", default: false})
    status: boolean;

    @Column({type: "date", nullable: false})
    signdate: Date;

    @Column({type: "varchar", nullable: true})
    notes: string;
}