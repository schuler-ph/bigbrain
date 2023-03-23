import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MgToEx } from "./MgToEx";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    ex_id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(() => MgToEx, (mgToEx: MgToEx) => mgToEx.exercise)
    mgToEx: MgToEx[];
}

/*
Pushup
  Chest & Front Deltoid
  Triceps & Abs
  https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Muscles-worked-by-kneeling-incline-push-up.jpg
Chinup
  Lats & Biceps
  Lower arms & Posterior Delts & Rotator Cuffs
Pike push up
  Anterior delts & triceps
  
*/
