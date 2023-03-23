import { DataSource } from "typeorm";
import { User } from "src/models/User";
import { Bodyweight } from "src/models/Bodyweight";
import { Note } from "src/models/Note";
import { Exercise } from "src/models/Exercise";
import { MuscleGroup } from "src/models/MuscleGroup";
import { MgToEx } from "src/models/MgToEx";

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
