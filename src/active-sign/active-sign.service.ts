import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class ActiveSignService {
    
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getSE(choices: boolean): Promise<any> {
        const result = await this.conn.query(`SELECT name FROM public.${choices == true ? 'event' : 'semester'}`);

        return result.rows;
    }

    async getSEID(choices: string, name: string): Promise<any> {
        const result = await this.conn.query(`SELECT ${choices}_id FROM public.${choices == 'event' ? 'event' : 'semester'} WHERE name = $1`, [name]);

        return result.rows[0][`${choices}_id`];
    }

    async valueCheck(section: string, sectionValue: string): Promise<boolean> {
        const result = await this.conn.query(`SELECT * FROM public.${section} WHERE name = $1`, [sectionValue]);

        return result.rows.length > 0 ? true : false;
    }

    async getActive(id: string, section: string): Promise<any> {
        const result = await this.conn.query(`SELECT * FROM public.${section}_active WHERE mem_id = $1`, [id]);

        return result.rows;
    }

    async checkActive(id: string, section: string, sectionID: string): Promise<boolean> {
        const result = await this.conn.query(`SELECT * FROM public.${section}_active WHERE mem_id = $1 AND ${section}_id = $2`, [id, sectionID]);

        return result.rows.length > 0 ? true : false;
    }

    async signupForm(id: string, section: string, sectionID: string, isActive: boolean, note: string): Promise<any> {
        const date = new Date();

        const check = await this.checkActive(id, section, sectionID);
        if (check) {
            const result = await this.conn.query(`UPDATE public.${section}_active SET status = $1, signdate = $2, note = $3 WHERE mem_id = $4 AND ${section}_id = $5`, [isActive, date, note, id, sectionID]);
            return result;
        } else {
            const result = await this.conn.query(`INSERT INTO public.${section}_active(mem_id, ${section}_id, status, signdate, note) VALUES ($1, $2, $3, $4, $5)`, [id, sectionID, isActive, date, note]);
            return result;
        }
    }

    async getActiveList(user: string, section: string): Promise<any> {
        const result = await this.conn.query(`SELECT e.name, a.status, a.note 
            FROM public.${section == 'event' ? 'event' : 'sem'}_active a 
            JOIN public.${section == 'event' ? 'event' : 'semester'} e ON a.${section == 'event' ? 'event' : 'sem'}_id = e.${section == 'event' ? 'event' : 'sem'}_id 
            WHERE a.mem_id = $1 
            ORDER BY a.signdate`, [user]);

        return result.rows;
    }
}
