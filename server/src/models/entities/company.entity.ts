import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Companies')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
}