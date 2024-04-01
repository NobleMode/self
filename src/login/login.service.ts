import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PG_CONNECTION } from 'src/db-connect/constants';

export let result;
export let user;

@Injectable()
export class LoginService {
    constructor(@Inject(PG_CONNECTION) private conn: any, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {

        if (username.includes("@fpt.edu.vn")) {
            user = await this.conn.query(`SELECT * FROM public.member WHERE mail = $1 AND password = $2`, [username, password]);
        } else {
            user = await this.conn.query(`SELECT * FROM public.member WHERE username = $1 AND password = $2`, [username, password]);
        }

        if (user && user.rows.length > 0) {
        const { password, ...result } = user.rows[0];

        console.log(result);
        return result;
        }
        return null;
    }

    async login(authDTO: any) {
        const user = await this.validateUser(authDTO.username, authDTO.password);
        if (!user) {
        return null;
        }

        var perm;

        if (user.role_id == "TV" || user.role_id == "CTV") {
            perm = "member";
        } else if (user.role_id == "TB") {
            perm = "dept_admin";
        } else if (user.role_id == "CN" || user.role_id == "PCN") {
            perm = "admin";
        }

        const payload = { username: user.username, sub: user.rollno, perm: perm};

        console.log(payload);

        return this.jwtService.sign(payload);
    }
}