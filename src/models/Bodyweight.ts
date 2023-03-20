import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { User } from "src/models/User";

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

    @ManyToOne((type) => User, (user) => user, {
        cascade: true,
    })
    @JoinColumn({ name: "fk_user_bw", referencedColumnName: "user_uuid" })
    user: User;

    @Column("uuid")
    fk_user_bw: string;
}
