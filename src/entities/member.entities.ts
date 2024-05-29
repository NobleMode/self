import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dept } from "./dept.entities";
import { Contact } from "./contact.entities";
import { User } from "./user.entities";
import { Role } from "./role.entities";

@Entity('member')
export class Member {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", nullable: false})
    name: string
    
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
    
    @ManyToOne(() => Dept)
    dept_id: number
    
    @ManyToOne(() => Role)
    role_id: number

    @OneToOne(() => Contact, (c) => c.member, {eager: true})
    @JoinColumn()
    contact: Contact

    @OneToOne(() => User, (u) => u.member, {eager: true})
    @JoinColumn()
    user: User
}