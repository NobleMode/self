import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local'
import { LoginService } from '../login.service';
import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private loginService: LoginService) {
        super();
    }

    validate(username: string, password: string) {
        const user = this.loginService.login({username, password});

        if (!user) {
            return null;
        }

        return user;
    }
}