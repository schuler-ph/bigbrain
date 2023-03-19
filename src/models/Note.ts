import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    note_uuid: string;

    @Column({
        length: 100,
    })
    title: string;

    @Column("text")
    content: string;

    @ManyToOne(() => User, (user) => user, {
        cascade: true,
    })
    user: User;
}
