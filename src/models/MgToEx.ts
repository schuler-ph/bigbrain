import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Exercise } from "./Exercise";
import { MuscleGroup } from "./MuscleGroup";

@Entity()
export class MgToEx {
    @PrimaryGeneratedColumn()
    mgToEx_id: number;

    @ManyToOne(() => Exercise, (exercise) => exercise.mgToEx, {
        cascade: true,
    })
    @JoinColumn({ name: "exLink_id", referencedColumnName: "ex_id" })
    exercise: Exercise;

    @Column()
    exLink_id: number;

    @ManyToOne(() => MuscleGroup, (muscleGroup) => muscleGroup.mgToEx, {
        cascade: true,
    })
    @JoinColumn({ name: "mgLink_id", referencedColumnName: "mg_id" })
    muscleGroup: MuscleGroup;

    @Column()
    mgLink_id: number;

    @Column()
    primary: boolean;
}
