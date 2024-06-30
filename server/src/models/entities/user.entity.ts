import { Expose } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRoles } from "../../../utils/types/enums/user-roles.enum";

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

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.DEFAULT
    })
    role: UserRoles
}