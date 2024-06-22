import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    emailAddress: string
}