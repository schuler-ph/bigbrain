import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "src/models/User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    note_uuid: string;
    // @PrimaryGeneratedColumn()
    // id!: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        length: 100,
    })
    title: string;

    @Column("text")
    content: string;

    @ManyToOne((type) => User, (user) => user, {
        cascade: true,
    })
    @JoinColumn({ name: "fk_user_note", referencedColumnName: "user_uuid" })
    user: User;

    @Column("uuid")
    fk_user_note: string;
}
