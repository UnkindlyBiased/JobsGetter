import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    categoryName: string

    @Column()
    categoryLogoLink: string

    @ManyToOne(() => CategoryEntity, {
        cascade: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    parent: CategoryEntity

    @OneToMany(() => CategoryEntity, category => category.parent)
    children: CategoryEntity[]
}