import { Controller, Render, Get, Req, UseGuards, Query, Post, Body} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ListService } from './list.service';
import { CommonService } from 'src/db-connect/common.service';

@Controller('infor')
export class ListController {
    constructor(private readonly lS: ListService, private readonly cS: CommonService) { }

    @Get()
    @Render('infor.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.cS.getInfo(username, "username"),
            name: await this.cS.getInfo(username, "name"),
            rollno: (await this.cS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.cS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.cS.getRef(username, "dept", true),
            role: await this.cS.getRef(username, "role", true),

            memList: await this.lS.getAll(),
        };
    }

    @Get('sort')
    async sortMembersBy(@Query('criteria') criteria) {
        const members = await this.lS.sortMembersBy(criteria);
        return { members };
    }

    @Get('search')
    async searchMembers(@Query('criteria') criteria) {
        const members = await this.lS.searchMembers(criteria);
        return { members };
    }

    @Post('delete')
    async deleteMembers(@Body('rollnos') rollnos: string[]) {
        for (const rollno of rollnos) {
            await this.lS.deleteMember(rollno.toLocaleLowerCase());
        }
        const members = await this.lS.getAll();
        return { members };
    }
}
