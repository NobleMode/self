import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ProfileService } from './profile.service';
import { CommonService } from '../db-connect/common.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly cs: CommonService) { }

    @Get()
    @Render('profile.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.cs.getInfo(username, "username"),
            name: await this.cs.getInfo(username, "name"),
            rollno: (await this.cs.getInfo(username, "rollno")).toLocaleUpperCase(),
            mail: await this.cs.getInfo(username, "mail"),
            phone: await this.cs.getInfo(username, "phone"),
            loc: await this.cs.getInfo(username, "address"),
            dob: new Date(await this.cs.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.cs.getRef(username, "dept", true),
            role: await this.cs.getRef(username, "role", true),
            gen: await this.cs.getInfo(username, "gen"),
        };
    }
}
