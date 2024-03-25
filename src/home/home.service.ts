import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class HomeService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getUser(): Promise<any> {
        const result = await this.conn.query('SELECT * FROM users');
        return result.rows;
    }
}
