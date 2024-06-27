import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable, map } from "rxjs"

@Injectable()
export class MessageResponseInterceptor implements NestInterceptor {
    constructor(private message: string) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(() => { 
                return { message: this.message }    
            })
        )
    }
}