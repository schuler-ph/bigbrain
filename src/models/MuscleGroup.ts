import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { MgToEx } from "./MgToEx";

@Entity()
export class MuscleGroup {
    @PrimaryColumn()
    mg_id: number;

    @Column()
    name: string;

    @ManyToOne(
        () => MuscleGroup,
        (muscleGroup: MuscleGroup) => muscleGroup.part_of_mg
    )
    part_of_mg: MuscleGroup;

    @OneToMany(() => MgToEx, (mgToEx: MgToEx) => mgToEx.muscleGroup)
    mgToEx: MgToEx[];
}

/*
Torso
  Chest (Pecs)
  Back
    Lats
    Traps
  Lower Back
  Core
    Abs
    Obliques
Arms
  Shoulders
    Delts
      Anterior
      Lateral
      Posterior
    Rotator Cuffs
  Upper arms
    Biceps
    Triceps
  Lower arms
Legs
  Glutes
  Quads
  Hamstrings
  Calves
  Adductors
  Abductors
*/
