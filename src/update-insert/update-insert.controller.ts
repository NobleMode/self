import { Controller, Render, Get, Req, Param, Query} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UpdateInsertService } from './update-insert.service';

@Controller('updateInsert')
export class UpdateInsertController {
    constructor(private readonly uiS: UpdateInsertService) { }

    @Get()
    @Render('updateInsert.hbs')
    async root(@Query('id') id: string,@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.uiS.getInfo(username, "username"),
            name: await this.uiS.getInfo(username, "name"),
            rollno: (await this.uiS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.uiS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.uiS.getRef(username, "dept"),
            role: await this.uiS.getRef(username, "role"),

            editaction: id === 'new' ? "Adding a New " : 'Editing ' + (await this.uiS.getInfoRollno(id, "user")) + "'s ",

            edituser: id === 'new' ? '' : await this.uiS.getInfoRollno(id, "username"),
            editname: id === 'new' ? '' : await this.uiS.getInfoRollno(id, "name"),
            editrollno: id === 'new' ? '' : (await this.uiS.getInfoRollno(id, "rollno")).toLocaleUpperCase(),
            editdob: id === 'new' ? '' : new Date(await this.uiS.getInfoRollno(id, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            editdept: id === 'new' ? 'Danh sách' : await this.uiS.getRef(await this.uiS.getInfoRollno(id, "username"), "dept"),
            editrole: id === 'new' ? 'Danh sách' : await this.uiS.getRef(await this.uiS.getInfoRollno(id, "username"), "role"),
            editgen: id === 'new' ? '' : await this.uiS.getInfo,
            editphone: id === 'new' ? '' : await this.uiS.getInfoRollno(id, "phone"),
            editloc: id === 'new' ? '' : await this.uiS.getInfoRollno(id, "loc"),
        };
    }
}
