import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Response } from "express";

import { CookieHelper } from "../helpers/cookie.helper";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
    constructor(private cookieHelper: CookieHelper) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                const res: Response = context.switchToHttp().getResponse();
                const tokens = data;

                this.cookieHelper.setCookie(res, 'accessToken', tokens.accessToken)

                return tokens;
            })
        )
    }
}