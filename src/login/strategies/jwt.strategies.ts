import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from 'dotenv';
import { Request } from 'express';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwt,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.KEY,
        });
    }

    private static extractJwt(req: Request): string | null {
        if (req.cookies && req.cookies['jwt']) {
            console.log(req.cookies['jwt']);
            return req.cookies['jwt'];
        }
        console.log("null");
        return null;
    }

    async validate(payload: any) {
        // Handle the payload of the JWT here
        // This method should return the user based on the payload
        // For now, let's just return the payload
        return payload;
    }
}