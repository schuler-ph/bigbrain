import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { MgToEx } from "src/models/MgToEx";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    ex_id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(() => MgToEx, (mgToEx) => mgToEx.exercise)
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