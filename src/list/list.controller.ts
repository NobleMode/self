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
            user: await this.cS.getInfo(username),

            memList: await this.lS.getAll(),
        };
    }

    @Get('list')
    async sortAndSearchBy(@Query('criteria') criteria) {
        const members = await this.lS.memberSortAndSearchBy(criteria);
        
        return { members };
    }

    @Post('delete')
    async deleteMembers(@Body('rollnos') rollnos: string[], @Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];
        const user = await this.cS.getInfo(username);
        let count : number = rollnos.length;

        for (const rollno of rollnos) {
            if (user.rollno === rollno) {
                return;
            }
            await this.lS.deleteMember(rollno.toLocaleLowerCase());
            count--;
        }
        const members = await this.lS.getAll();
        return { members };
    }
}
