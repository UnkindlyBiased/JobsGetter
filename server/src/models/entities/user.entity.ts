import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { UserRoles } from "../../../utils/types/enums/user-roles.enum";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column({
        unique: true
    })
    shortName: string

    @Column()
    password: string

    @Column()
    emailAddress: string

    @Column({ nullable: true })
    profilePicLink: string

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.DEFAULT
    })
    role: UserRoles
}