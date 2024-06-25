import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_CONNECTION } from 'src/db-connect/constants';
import { Member } from 'src/entities/member.entities';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

export let result : any;
@Injectable()
export class LoginService {
    constructor(
        @Inject(PG_CONNECTION) private conn: any,
        private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Member) private memberRepository: Repository<Member>) { }

    async validateUser(username: string, password: string): Promise<any> {

        let user : any

        if (username.includes("@fpt.edu.vn")) {
            user = await this.usersRepository.findOne({ where: { mail: username, password: password } });
        } else {
            user = await this.usersRepository.findOne({ where: { user: username, password: password } });
        }

        if (user) {
            delete user.password;

            return user;
        }

        return null;
    }

    async login(authDTO: any) {
        const user = await this.validateUser(authDTO.username, authDTO.password);
        if (!user) {
            return null;
        }

        const member = await this.memberRepository.findOne({ where: { user: user.id }, relations: ["role"] });

        const username = member.username
        const sub = member.rollno
        const perm = member.role.permissions

        const payload = { username: username, sub: sub, perm: perm };

        return this.jwtService.sign(payload);
    }
}