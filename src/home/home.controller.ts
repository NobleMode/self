import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { HomeService } from './home.service';
import { CommonService } from 'src/db-connect/common.service';

@Controller('home')
export class HomeController {
    constructor(private readonly cS: CommonService) { }

    @Get()
    @Render('home.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.cS.getInfo(username, "username"),
            name: await this.cS.getInfo(username, "name"),
            rollno: (await this.cS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.cS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.cS.getRef(username, "dept", true),
            role: await this.cS.getRef(username, "role", true),
        };
    }
}
