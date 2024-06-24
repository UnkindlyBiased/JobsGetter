import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "../../../controllers/auth.controller";
import { UserModule } from "./user.module";
import { CookieHelper } from "../../../../utils/helpers/cookie.helper";
import { AuthService } from "../../../services/auth.service";
import { LocalStrategy } from "../../../../utils/strategies/local.strategy";
import { JwtStrategy } from "../../../../utils/strategies/jwt.strategy";
import { JwtGuard } from "../../../../utils/guards/jwt.guard";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30d'
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [CookieHelper, AuthService, LocalStrategy, JwtStrategy, JwtGuard],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}