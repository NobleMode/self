import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entities";
import { Semester } from "./semester.entities";

@Entity('SemesterActive')
export class semsActive {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Member, (m) => m.rollno)
    member: Member;

    @ManyToOne(() => Semester, (s) => s.id)
    semester: Semester;
}