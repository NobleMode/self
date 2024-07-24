import { Controller, Render, Get, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { CommonService } from '../db-connect/common.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly cs: CommonService) { }

    @Get()
    @Render('profile.hbs')
    async root(@Req() request: Request) {
        const username = jwt.decode(request.cookies.jwt)['username'];

        return { 
            user: await this.cs.getInfo(username, "username"),
        };
    }
}
