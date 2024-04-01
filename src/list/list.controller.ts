import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ListService } from './list.service';

@Controller('infor')
export class ListController {
    constructor(private readonly lS: ListService) { }

    @Get()
    @Render('infor.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.lS.getInfo(username, "username"),
            name: await this.lS.getInfo(username, "name"),
            rollno: (await this.lS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.lS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.lS.getRef(username, "dept"),
            role: await this.lS.getRef(username, "role"),

            memList: await this.lS.getAll(),
        };
    }
}
