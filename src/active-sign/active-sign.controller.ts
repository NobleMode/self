import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ActiveSignService } from './active-sign.service';

@Controller('active')
export class ActiveSignController {
    constructor(private readonly aS: ActiveSignService) { }

    @Get()
    @Render('active.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.aS.getInfo(username, "username"),
            name: await this.aS.getInfo(username, "name"),
            rollno: (await this.aS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.aS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.aS.getRef(username, "dep"),
            role: await this.aS.getRef(username, "role"),
        };
    }
}
