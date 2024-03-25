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
        return result;
        }
        return null;
    }

    async login(authDTO: any) {
        const user = await this.validateUser(authDTO.username, authDTO.password);
        if (!user) {
        return null;
        }

        const payload = { username: user.username, sub: user.userId };

        return this.jwtService.sign(payload);
    }
}