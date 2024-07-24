import { Controller, Render, Get, Req} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { CommonService } from 'src/db-connect/common.service';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly cS: CommonService, private readonly hS : HomeService) { }

    @Get()
    @Render('home.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];
        const images = await this.hS.getImages();
        const topDog = await this.hS.getUserByRole(0)
        const secDog = await this.hS.getUserByRole(1)

        let userData = {
            topDog,
            secDog,
            now: await this.hS.getUserByDate("now"),
            close: await this.hS.getUserByDate("close"),
            mem: {
                total: await this.hS.getTotalbyDept("*"),
                cm: await this.hS.getTotalbyDept(0),
                tt: await this.hS.getTotalbyDept(1),
                dn: await this.hS.getTotalbyDept(2),
                nd: await this.hS.getTotalbyDept(3),
            }
        }

        console.log(userData)

        return { 
            user: await this.cS.getInfo(username),
            images,
            page: "home",
            userData
        };
    }

    @Get("testhome")
    @Render('test.hbs')
    async testhome(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.cS.getInfo(username),
        };
    }
}
