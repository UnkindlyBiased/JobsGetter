import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";

import { PositionType } from "../../../utils/types/enums/position-level.type";
import { UserEntity } from "./user.entity";

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

    @ManyToOne(() => UserEntity, {
        cascade: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    recruter: UserEntity
}