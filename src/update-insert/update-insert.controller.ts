import { Controller, Render, Get, Req, Param} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UpdateInsertService } from './update-insert.service';

@Controller('updateInsert')
export class UpdateInsertController {
    constructor(private readonly uiS: UpdateInsertService) { }

    @Get(':id')
    @Render('updateInsert.hbs')
    async root(@Param('id') id: string,@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.uiS.getInfo(username, "username"),
            name: await this.uiS.getInfo(username, "name"),
            rollno: (await this.uiS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.uiS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.uiS.getRef(username, "dept"),
            role: await this.uiS.getRef(username, "role"),
        };
    }
}
