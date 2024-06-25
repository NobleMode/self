
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
    constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) {}
    
    async getInfo(input: string, item?: string): Promise<any> {
        const result = await this.memberRepository.findOne({ where: { username: input }, relations: ['user', 'dept', 'role']});
        
        return item ? result[item] : result;
    }

    async getRef(input: string, refItem: string, s: boolean): Promise<any> {
        const result = await this.memberRepository.findOne({ where: { username: input }, relations: [refItem] });

        return s ? result[refItem]['name'] : result[refItem]['id'];
    }

    async getInfoRollno(input: string, item: string): Promise<string> {
        const result = await this.memberRepository.findOne({ where: { rollno: input } });

        return item === '*' ? result : result[item];
    }
}