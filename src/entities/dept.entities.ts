import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Member } from "./member.entities"

@Entity('dept')
export class Dept {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: false})
    description: string

    @OneToMany(() => Member, (m) => m.dept_id)
    members: Member[]
}