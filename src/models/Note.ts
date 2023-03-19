import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

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
        unique: true,
    })
    title: string;

    @Column("text")
    content: string;

    @ManyToOne(() => User, (user) => user, {
        cascade: true,
    })
    user: User;
}
