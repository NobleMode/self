import { Controller, Render, Get, Req, Query, Post, Body, Res} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UpdateInsertService } from './update-insert.service';
import { CommonService } from '../db-connect/common.service';

@Controller('updateInsert')
export class UpdateInsertController {
    constructor(private readonly uiS: UpdateInsertService, private readonly cS: CommonService) { }

    @Get()
    @Render('updateInsert.hbs')
    async root(@Query('id') iid: string,@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        const id = iid.toLowerCase();

        return { 
            user: await this.cS.getInfo(username, "username"),
            name: await this.cS.getInfo(username, "name"),
            rollno: (await this.cS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.cS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.cS.getRef(username, "dept", true),
            role: await this.cS.getRef(username, "role", true),

            editaction: id === 'new' ? "Adding a New " : 'Editing ' + (await this.cS.getInfoRollno(id, "username")) + "'s ",

            edituser: id === 'new' ? null : await this.cS.getInfoRollno(id, "username"),
            editname: id === 'new' ? null : await this.cS.getInfoRollno(id, "name"),
            editrollno: id === 'new' ? null : (await this.cS.getInfoRollno(id, "rollno")).toLocaleUpperCase(),
            editdob: id === 'new' ? new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : new Date(await this.cS.getInfoRollno(id, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            editdept: id === 'new' ? null : await this.cS.getRef(await this.cS.getInfoRollno(id, "username"), "dept", true),
            editrole: id === 'new' ? null : await this.cS.getRef(await this.cS.getInfoRollno(id, "username"), "role", true),
            editgen: id === 'new' ? null : await this.cS.getInfoRollno(id, "gen"),
            editphone: id === 'new' ? null : await this.cS.getInfoRollno(id, "phone"),
            editloc: id === 'new' ? null : await this.cS.getInfoRollno(id, "address"),
            editmail: id === 'new' ? null : await this.cS.getInfoRollno(id, "mail"),
            editkhoa: id === 'new' ? null : await this.cS.getInfoRollno(id, "khoa"),
            editfb: id === 'new' ? null : await this.cS.getInfoRollno(id, "fb"),
        };
    }

    @Post('post')
    async updateInsert(@Req() request: Request, @Body() body: any, @Res() response: Response) {

        const { name, rollno, dob, dept, role, gen, phone, loc, mail } = body;

        if(await this.cS.getInfoRollno(rollno.toLowerCase(), "*")) {
            console.log("Roll number already exists");

            const result = await this.uiS.updateInfo(body);
            console.log(result);

            if (result === "info unchanged") {
                return;
            } else {
                console.log(result);
            }

            return;
        }


        console.log("Roll number doesn't exist");
        console.log(await this.uiS.insertInfo(body));
        return;
    }
}
