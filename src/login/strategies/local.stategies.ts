import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local'
import { LoginService } from '../login.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private loginService: LoginService) {
        super();
    }

    validate(username: string, password: string) {
        const user = this.loginService.login({username, password});

        if (!user) throw new UnauthorizedException();

        return user;
    }
}