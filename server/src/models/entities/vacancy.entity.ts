import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne, ManyToMany } from "typeorm";

import { PositionType } from "../../../utils/types/enums/position-level.type";
import { UserEntity } from "./user.entity";
import { CompanyEntity } from "./company.entity";
import { CategoryEntity } from "./category.entity";

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
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    recruter: UserEntity

    @ManyToOne(() => CompanyEntity, {
        onDelete: 'SET NULL',
        cascade: true
    })
    @JoinColumn()
    company: CompanyEntity

    @ManyToMany(() => CategoryEntity)
    categories: CategoryEntity[]
}