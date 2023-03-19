import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

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
}
