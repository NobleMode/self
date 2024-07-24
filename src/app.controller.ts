import { Controller, Get, Redirect, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // FIXME - Redirection error, need to fix - For some reason if you use / it wouldnt redirect to /login
  @Get()
  @Redirect('/login')
  root() {}
}
