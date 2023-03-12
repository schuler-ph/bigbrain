import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from "typeorm";

import { Bodyweight } from "./Bodyweight";
import { Note } from "./Note";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_uuid: string;

    @Column({
        length: 30,
    })
    username: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Bodyweight, (bodyweight) => bodyweight.user)
    bw_entries: Bodyweight[];

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];
}
