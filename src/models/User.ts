import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { userRepo } from "src/db_conn";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_uuid: string;

    // @PrimaryGeneratedColumn()
    // id!: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        length: 50,
        unique: true,
    })
    username!: string;

    @Column({
        unique: true,
    })
    email!: string;

    @Column()
    password!: string;
}
