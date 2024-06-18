import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { PositionType } from "../../../utils/types/PositionType";

@Entity('Vacancies')
export class VacancyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ 
        type: 'enum',
        enum: PositionType,
        nullable: true
    })
    positionLevel: PositionType
}