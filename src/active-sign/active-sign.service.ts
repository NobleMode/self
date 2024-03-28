import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class ActiveSignService {
    
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getInfo(input: string, item: string): Promise<string> {
        const result = await this.conn.query(`SELECT * FROM public.member WHERE username = $1`, [input]);
        return result.rows[0][item];
    }

    async getRef(input: string, refItem: string): Promise<any> {
        const result = await this.conn.query(`SELECT o.name FROM public.member m JOIN public.${refItem} o ON m.${refItem}_id = o.${refItem}_id WHERE m.username = '${input}'`);
        return result.rows[0]['name'];
    }

    async getSE(choices: boolean): Promise<any> {
        const result = await this.conn.query(`SELECT name FROM public.${choices == true ? 'event' : 'semester'}`);

        return result.rows;
    }

    async valueCheck(section: string, sectionValue: string): Promise<boolean> {
        const result = await this.conn.query(`SELECT * FROM public.${section} WHERE name = $1`, [sectionValue]);

        return result.rows.length > 0 ? true : false;
    }

    async signup(username: string, section: string, sectionValue: string, isActive: boolean, note: string): Promise<boolean> {
        const result = await this.conn.query(`INSERT INTO public.${section}_active(id, )`);

        return result.rowCount > 0 ? true : false;
    }
}
