import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly hS: HomeService) { }

    @Get()
    @Render('home.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.hS.getInfo(username, "username"),
            name: await this.hS.getInfo(username, "name"),
            rollno: (await this.hS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.hS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.hS.getRef(username, "dept"),
            role: await this.hS.getRef(username, "role"),
        };
    }
}
