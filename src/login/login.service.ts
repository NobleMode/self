import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class LoginService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async login(username: string, password: string) {
        const result = await this.conn.query("SELECT id, rollno, name, gen, khoa, dob, phone, mail, dep_id, role_id, address, fb_link, username, password FROM public.member where username = '" + username + "' and password = '" + password + "';")

        console.log(result);
        const check =  result.rows.length === 0 ? false : true;
        return check;
    }
}
