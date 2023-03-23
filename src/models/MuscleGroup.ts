import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { MgToEx } from "src/models/MgToEx";

@Entity()
export class MuscleGroup {
    @PrimaryColumn()
    mg_id: number;

    @Column()
    name: string;

    @Column()
    part_of_mg: MuscleGroup;

    @OneToMany(() => MgToEx, (mgToEx) => mgToEx.muscleGroup)
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
