import { Controller, Get, Post, Render, Request, Body, Res, Session } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @Render('login.hbs')
  root() {}

  @Post()
  async login(@Request() req, @Body() body, @Res() res: Response) {
    const { username, password } = body;

    const isLoggedIn = await this.loginService.login(username, password);
    if (isLoggedIn) {
      // Redirect to the home page or perform any other action
      res.redirect('/home');
    } else {
      // Redirect to the login page or perform any other action
      res.redirect('/login');
    }
  }
}