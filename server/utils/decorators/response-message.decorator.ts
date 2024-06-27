import { UseInterceptors } from "@nestjs/common";

import { MessageResponseInterceptor } from "../interceptors/response-message.interceptor";

export function ResponseMessage(message?: string) {
    return UseInterceptors(new MessageResponseInterceptor(message))
}