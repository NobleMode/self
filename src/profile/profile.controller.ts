import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly pS: ProfileService) { }

    @Get()
    @Render('profile.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.pS.getInfo(username, "username"),
            name: await this.pS.getInfo(username, "name"),
            rollno: (await this.pS.getInfo(username, "rollno")).toLocaleUpperCase(),
            mail: await this.pS.getInfo(username, "mail"),
            phone: await this.pS.getInfo(username, "phone"),
            loc: await this.pS.getInfo(username, "address"),
            dob: new Date(await this.pS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.pS.getRef(username, "dept"),
            role: await this.pS.getRef(username, "role"),
            gen: await this.pS.getInfo(username, "gen"),
        };
    }
}
