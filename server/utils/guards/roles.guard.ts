import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

import { UserEntity } from "../../src/models/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const roles = this.reflector.getAll('roles', [
            context.getHandler(),
            context.getHandler()
        ])

        if (!roles) return true

        const user = request.user as UserEntity
        const matchRoles = roles.some(role => user.role === role)

        return matchRoles
    }
}