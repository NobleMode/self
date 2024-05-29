import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';
import { CommonService } from '../db-connect/common.service';

@Injectable()
export class UpdateInsertService {
    constructor(@Inject(PG_CONNECTION) private conn: any, private readonly cs : CommonService) {}



    async updateInfo(body: any): Promise<any> {

        console.log(body);

        const {name, username, rollno, dob, khoa, gen, phone, loc, mail, fb } = body;
        const dept_id = await this.cs.getRef(username, 'dept', false);
        const role_id = await this.cs.getRef(username, 'role', false);
        const password = await this.cs.getInfo(username, 'password');

        console.log(this.PostSQLdateChanger(dob));

        return;

        const result = await this.conn.query(`UPDATE public.member SET name = $1, gen = $2, khoa = $3, dob = $4, phone = $5, mail = $6, dept_id = $7, role_id = $8, address = $9, fb = $10, username = $11, password = $12 WHERE rollno = $13`,
            [name, gen, khoa, dob, phone, mail, dept_id, role_id, loc, fb, username, password, rollno]
        );

        return result.rows.length === 0 ? "info unchanged" : result.rows[0];
    }

    // TODO - finish feature

    async verifyInfo(start: any, end: any): Promise<any>{
        var verifyObject = this.cs.getInfoRollno(start, "test");
        var endObject = this.cs.getInfoRollno(end, "test");
    }

    //FIXME - Dept ID instead of Name
    //FIXME - Role ID instead of Name
    async insertInfo(body: any): Promise<any> {
        const { rollno, name, gen, khoa, dob, phone, mail, dept_id, role_id, address, fb, username, password } = body;
        return await this.conn.query(
            `INSERT INTO public.member (rollno, name, gen, khoa, dob, phone, mail, dept_id, role_id, address, fb, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [rollno, name, gen, khoa, dob, phone, mail, dept_id, role_id, address, fb, username, password]
        );
    }

    async checkData(body: any): Promise<any> {
        const rollno = body.rollno;
        const result = await this.conn.query(`SELECT * FROM public.member WHERE rollno = $1`, [rollno]);
        if (rollno == result.rows[0].rollno) { return "Roll number already exists"; }
        return result.rows.length === 0 ? "info unchanged" : result.rows[0];
    }

    async VNdateChanger(date: Date): Promise<string> {
        return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    async PostSQLdateChanger(date: Date): Promise<string> {
        const parts = date.toString().split('/');

        if (parts.length !== 3) {
            throw new Error(`Invalid date: ${date}`);
        }

        const [day, month, year] = parts;
        const formattedDate = `${year}-${month}-${day}T00:00:00`;

        return formattedDate;
    }
}
