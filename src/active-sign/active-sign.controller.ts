import { Controller, Render, Get, Req, UseGuards, Post, Body, Res} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ActiveSignService } from './active-sign.service';
import { JwtGuard } from 'src/login/guard/jwt.guard';
import { Response } from 'express';

@Controller('active')
export class ActiveSignController {
    constructor(private readonly aS: ActiveSignService) { }

    @Get()
    @Render('active.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        console.log(await this.aS.getSE(true));
        console.log(await this.aS.getSE(false));

        return { 
            user: await this.aS.getInfo(username, "username"),
            name: await this.aS.getInfo(username, "name"),
            rollno: (await this.aS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.aS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.aS.getRef(username, "dept"),
            role: await this.aS.getRef(username, "role"),

            sems: await this.aS.getSE(false),
            event: await this.aS.getSE(true),
        };
    }

    @Post('signup')
    async signup(@Req() request: Request, @Body() body: any, @Res() response: Response) {
        const username = jwt.decode(request.cookies.jwt)['username'];
        console.log(username);
        console.log(body);

        const { section, sectionValue, active: isActive, message: note } = body;
        console.log(section, sectionValue, isActive, note);

        if (isActive != 'true' && isActive != 'false' || !this.aS.valueCheck(section, sectionValue) || section != 'sem' && section != 'event') {
            response.status(401).json({ message: "Error. Malformed Data?" });
            return;
        }
        
        return;
    }
}
