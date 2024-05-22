import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class CommonService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}
    
    async getInfo(input: string, item: string): Promise<string> {
        const result = await this.conn.query(`SELECT * FROM public.member WHERE username = $1`, [input]);
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