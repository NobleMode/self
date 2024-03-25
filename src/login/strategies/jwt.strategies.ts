import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CryptoService } from "src/db-connect/crypto.service";
import { config } from 'dotenv';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly cryptoService: CryptoService) {
        super({
            jwtFromRequest: (req) => {
                const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();
                const rawToken = extractJwt(req);
                return this.cryptoService.decrypt(rawToken);
              },
            ignoreExpiration: false,
            secretOrKey: process.env.KEY,
        });
    }

    decrypt(rawToken: string) {
        return this.cryptoService.decrypt(rawToken);
    }

    validate(payload: any) {
        console.log("Inside JWT Validate: " + payload);
        return payload;
    }
}