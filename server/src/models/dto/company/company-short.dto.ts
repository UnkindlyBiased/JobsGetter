import { Expose } from "class-transformer";

export class CompanyShortDto {
    @Expose()
    id: string

    @Expose()
    name: string
}