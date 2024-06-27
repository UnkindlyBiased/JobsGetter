import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class CookieHelper {
    async setCookie(
        @Res() res: Response,
        name: string,
        cookieContent: string
    ) {
        return res.cookie(name, cookieContent, {
            httpOnly: true,
            sameSite: 'strict'
        })
    }

    async removeCookie(
        @Res() res: Response,
        name: string
    ) {
        res.clearCookie(name, {
            httpOnly: true,
            sameSite: 'strict'
        })
        res.end()
    }
}