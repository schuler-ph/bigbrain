import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Bodyweight {
    @PrimaryGeneratedColumn("uuid")
    bw_uuid: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column("decimal")
    kg: number;

    @ManyToOne(() => User, (user) => user, {
        cascade: true,
    })
    user: User;
}
