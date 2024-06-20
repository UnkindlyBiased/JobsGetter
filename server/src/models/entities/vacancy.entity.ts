import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

import { PositionType } from "../../../utils/types/position-level.type";

@Entity('Vacancies')
export class VacancyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    minOrDefaultPaycheck: number

    @Column({ nullable: true })
    maxPaycheck: number

    @Column({ 
        type: 'enum',
        enum: PositionType,
        nullable: true
    })
    positionLevel: PositionType

    @Column({ default: false })
    isClosed: boolean

    @CreateDateColumn()
    creationDate: Date

    @Column({ default: 0 })
    views: number
}