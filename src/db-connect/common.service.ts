import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
    constructor(@Inject(PG_CONNECTION) private conn: any,
    @InjectRepository(Member) private memberRepository: Repository<Member>) {}
    
    async getInfo(input: string, item: string): Promise<string> {
        const result = await this.conn.query(`SELECT * FROM public.member WHERE username = $1`, [input]);
        const result2 = await this.memberRepository.findOne({ where: { username: input } });
        return result.rows[0][item];
    }

    async getRef(input: string, refItem: string, s: boolean): Promise<any> {
        const result = await this.conn.query(`SELECT * FROM public.member m JOIN public.${refItem} o ON m.${refItem}_id = o.${refItem}_id WHERE m.username = '${input}'`);

        if (s) { return result.rows[0]['name']; } else { return result.rows[0][`${refItem}_id`]; }
    }

    async getInfoRollno(input: string, item: string): Promise<string> {
        const result = await this.conn.query(`SELECT * FROM public.member WHERE rollno = $1`, [input]);
        if (item === '*') {
            return result.rows;
        }
        return result.rows[0][item];
    }
}