import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Bodyweight {
    @PrimaryGeneratedColumn("uuid")
    bw_uuid: string;

    @Column()
    measured_at: Date;

    @Column("decimal")
    kg: number;

    @ManyToOne(() => User, (user) => user, {
        cascade: true,
    })
    @JoinColumn({ name: "fk_user_bw", referencedColumnName: "user_uuid" })
    user: User;

    @Column("uuid")
    fk_user_bw: string;
}
