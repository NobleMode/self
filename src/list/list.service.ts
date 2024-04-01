import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class ListService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getInfo(input: string, item: string): Promise<string> {
        const result = await this.conn.query(`SELECT * FROM public.member WHERE username = $1`, [input]);
        return result.rows[0][item];
    }

    async getRef(input: string, refItem: string): Promise<any> {
        const result = await this.conn.query(`SELECT o.name FROM public.member m JOIN public.${refItem} o ON m.${refItem}_id = o.${refItem}_id WHERE m.username = '${input}'`);
        return result.rows[0]['name'];
    }

    async getAll(): Promise<any> {
        const result = await this.conn.query(`
            SELECT m.*, d.name AS dept, r.name AS role
            FROM public.member m
            JOIN public.dept d ON m.dept_id = d.dept_id
            JOIN public.role r ON m.role_id = r.role_id
        `);
    
        const updatedRows = result.rows.map(row => ({
            ...row,
            rollno: row.rollno.toUpperCase(),
        }));
    
        console.log(updatedRows);
        return updatedRows;
    }
}
