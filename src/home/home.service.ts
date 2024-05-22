import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class HomeService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}
    
}
