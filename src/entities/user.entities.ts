import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { Member } from "./member.entities"

@Entity('user')
export class User {
    @PrimaryColumn()
    id: number
    
    @OneToOne(() => Member, member => member.user, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'id'})
    member: Member;
    
    @Column({type:"varchar", nullable: false})
    user: string
    
    @Column({type: "varchar", nullable: false})
    password: string
    
    @Column()
    mail: string
}