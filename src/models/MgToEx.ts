import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { Exercise } from "src/models/Exercise";
import { MuscleGroup } from "src/models/MuscleGroup";

@Entity()
export class MgToEx {
    @PrimaryGeneratedColumn()
    mgToEx_id: number;

    @ManyToOne(() => Exercise, (exercise) => exercise.exerciseToMuscleGroup, {
        cascade: true,
    })
    @JoinColumn({ name: "exLink_id", referencedColumnName: "ex_id" })
    exercise: Exercise;

    @Column()
    exLink_id: number;

    @ManyToOne(
        () => MuscleGroup,
        (muscleGroup) => muscleGroup.muscleGroupToExercise,
        { cascade: true }
    )
    @JoinColumn({ name: "mgLink_id", referencedColumnName: "mg_id" })
    muscleGroup: MuscleGroup;

    @Column()
    mgLink_id: number;

    @Column()
    primary: boolean;
}
