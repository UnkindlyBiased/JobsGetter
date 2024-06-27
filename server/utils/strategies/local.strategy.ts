import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'

import { UserPayloadDto } from '../../src/models/dto/user/user-payload.dto'
import { AuthService } from '../../src/services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(payload: UserPayloadDto) {
        const user = await this.authService.verify(payload)
        return user
    }
}