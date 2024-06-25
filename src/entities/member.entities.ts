import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dept } from "./dept.entities";
import { Contact } from "./contact.entities";
import { User } from "./user.entities";
import { Role } from "./role.entities";
import { EventActive } from "./eventactive.entities";
import { SemsActive } from "./semactive.entities";

@Entity('member')
export class Member {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", nullable: false})
    username: string

    @Column({type: "varchar", nullable: false})
    fullname: string
    
    @Column({type: "varchar", length: 8, nullable: false})
    rollno: string
    
    @Column({type: "varchar", nullable: false})
    mail:string
    
    @Column({type: "date", nullable: false})
    dob: Date
    
    @Column({type: "smallint", nullable: false})
    gen: number
    
    @Column({type: "smallint", nullable: false})
    schoolgen: number

    @OneToOne(() => Contact, (c) => c.member, {eager: true})
    @JoinColumn()
    contact: Contact

    @OneToOne(() => User, (u) => u.member, {eager: true})
    @JoinColumn()
    user: User

    @OneToMany(() => EventActive, (ea) => ea.member)
    eventactive: EventActive[]

    @OneToMany(() => SemsActive, (sa) => sa.member)
    semsactive: SemsActive[]

    @ManyToOne(() => Dept, dept => dept.members)
    @JoinColumn({ name: 'dept_id' }) // This line is important
    dept: Dept

    @ManyToOne(() => Role, role => role.members)
    @JoinColumn({ name: 'role_id' }) // This line is important
    role: Role;
}