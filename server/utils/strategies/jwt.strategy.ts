import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

import { AuthService } from "../../src/services/auth.service";
import { UserPayloadDto } from "../../src/models/dto/user/user-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }

    async validate(payload: UserPayloadDto) {
        const user = await this.authService.verify(payload)
        return user
    }
}