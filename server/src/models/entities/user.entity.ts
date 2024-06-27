import { Expose } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string

    @Column()
    @Expose()
    username: string

    @Column()
    @Expose()
    password: string

    @Column()
    @Expose()
    emailAddress: string
}