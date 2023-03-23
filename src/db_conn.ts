import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Bodyweight } from "./models/Bodyweight";
import { Note } from "./models/Note";
import { Exercise } from "./models/Exercise";
import { MuscleGroup } from "./models/MuscleGroup";
import { MgToEx } from "./models/MgToEx";

const db = new DataSource({
    type: "postgres",
    host: "test-database-instance.chazibtdctxl.eu-north-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: process.env.aws_pass,
    database: "bigbrain",
    entities: [User, Bodyweight, Note, Exercise, MuscleGroup, MgToEx],
    logging: true,
    synchronize: true,
});

export default db;

export const bodyweightRepo = db.getRepository(Bodyweight);
export const userRepo = db.getRepository(User);
export const noteRepo = db.getRepository(Note);
export const exRepo = db.getRepository(Exercise);
export const mgRepo = db.getRepository(MuscleGroup);
