import { Controller, Render, Get, Req, UseGuards, Post, Body, Res} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ActiveSignService } from './active-sign.service';
import { JwtGuard } from 'src/login/guard/jwt.guard';
import { Response } from 'express';
import { CommonService } from '../db-connect/common.service';

@Controller('active')
export class ActiveSignController {
    constructor(private readonly aS: ActiveSignService, private readonly cS: CommonService) { }

    @Get()
    @Render('active.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];
        const permTag = jwt.decode(request.cookies.jwt)['perm'];

        var perm;

        if (permTag == 'admin' || permTag == 'dept_admin') {
            perm = true;
        } else {
            perm = false;
        }

        console.log(await this.aS.getSE(true));
        console.log(await this.aS.getSE(false));

        console.log(await this.aS.getActiveList(await this.cS.getInfo(username, "rollno"), "sem"));
        console.log(await this.aS.getActiveList(await this.cS.getInfo(username, "rollno"), "event"));

        return { 
            user: await this.cS.getInfo(username, "username"),
            name: await this.cS.getInfo(username, "name"),
            rollno: (await this.cS.getInfo(username, "rollno")).toLocaleUpperCase(),
            dob: new Date(await this.cS.getInfo(username, "dob")).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            dept: await this.cS.getRef(username, "dept", true),
            role: await this.cS.getRef(username, "role", true),
            perm: perm,

            sems: await this.aS.getSE(false),
            event: await this.aS.getSE(true),

            activeSem: await this.aS.getActiveList(await this.cS.getInfo(username, "rollno"), "sem"),
            activeEvent: await this.aS.getActiveList(await this.cS.getInfo(username, "rollno"), "event"),
        };
    }

    @Post('signup')
    async signup(@Req() request: Request, @Body() body: any, @Res() response: Response) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        const { section, sectionValue, active: isActive, message: note } = body;

        console.log(body);

        const id = await this.cS.getInfo(username, "rollno");

        console.log(id);
    
        const sectionID = await this.aS.getSEID(section, sectionValue);

        console.log(sectionID);

        if (isActive != true && isActive != false) {
            console.log('Condition 1 is true');
            response.status(401).json({ message: "Error. Malformed Data?" });
            return;
        }
        
        if (!this.aS.valueCheck(section, sectionValue)) {
            console.log('Condition 2 is true');
            response.status(401).json({ message: "Error. Malformed Data?" });
            return;
        }
        
        if (section != 'sem' && section != 'event') {
            console.log('Condition 3 is true');
            response.status(401).json({ message: "Error. Malformed Data?" });
            return;
        }
        
        const result = await this.aS.signupForm(id, section, sectionID, isActive, note);
        
        return;
    }
}
