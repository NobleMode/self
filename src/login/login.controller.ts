import { Controller, Get, Post, Render, Request, Body, Res, Session, HttpException, UseGuards, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { authDTO } from 'src/login/dto/auth.dto';
import { JwtGuard } from './guard/jwt.guard';
import { config } from 'dotenv';
config();

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @Render('login.hbs')
  root() {}

  @Post()
  async login(@Body() body : authDTO, @Res() res: Response) {
    const isLoggedIn = await this.loginService.login(body);

    if (isLoggedIn == null) {
        res.status(401).json({ message: "Login failed. You forgot password or something?" });
    } else {
        res.cookie('jwt', isLoggedIn, { httpOnly: true });
        res.status(200).json({ message: "Login successful", redirectUrl: "/home" });
    }
}

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request & { user: any }){
    return req.user;
  }
}