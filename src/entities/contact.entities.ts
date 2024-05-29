import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from './member.entities';

@Entity('contact')
export class Contact {
    @PrimaryColumn()
    id: number

    @OneToOne(() => Member, member => member.contact)
    @JoinColumn({name: 'id'})
    member: Member;
    
    @Column({type: "varchar", length: 10, nullable: true})
    phone: string
    
    @Column()
    mail: string
    
    @Column({type: "varchar", nullable: true})
    facebook: string
    
    @Column({type: "varchar", nullable: true})
    address: string
}