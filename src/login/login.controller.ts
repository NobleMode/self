import { Controller, Get, Post, Render, Request, Body, Res, Session, HttpException, UseGuards, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { authDTO } from 'src/login/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guard/jwt.guard';
import { CryptoService } from 'src/db-connect/crypto.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService, private readonly ed: CryptoService) {}

  @Get()
  @Render('login.hbs')
  root() {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Body() body : authDTO, @Res() res: Response) {

    const isLoggedIn = await this.loginService.login(body);

    console.log(isLoggedIn);
    // Redirect to the home page or perform any other action

    const userEncrypted = await this.ed.encrypt(isLoggedIn);

    console.log(userEncrypted);
    res.cookie('jwt', userEncrypted, { httpOnly: true });

    console.log("real");
    res.redirect('/home');
      
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request & { user: any }){
    console.log(req.user);
    return req.user;
  }

}