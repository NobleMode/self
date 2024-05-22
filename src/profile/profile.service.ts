import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/db-connect/constants';

@Injectable()
export class ProfileService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}


}
