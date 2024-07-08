import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "./category.entity";

@Entity('Companies')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    companyName: string

    @Column()
    description: string

    @Column({ nullable: true })
    logoLink: string

    @Column({ nullable: true })
    showcaseImgLink: string

    @Column({ default: false })
    isVip: boolean

    @Column({ default: false })
    isVerified: boolean

    @OneToOne(() => CategoryEntity)
    @JoinColumn()
    mainCategory: CategoryEntity
}