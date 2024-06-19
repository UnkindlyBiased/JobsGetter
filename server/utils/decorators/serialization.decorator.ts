import { UseInterceptors } from "@nestjs/common";

import { SerializationInterceptor } from "../interceptors/serialization.interceptor";

interface ClassConstuctor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstuctor) {
    return UseInterceptors(new SerializationInterceptor(dto))
}