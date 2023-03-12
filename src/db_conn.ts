import { User } from "./models/User";
import { Bodyweight } from "./models/Bodyweight";
import { Note } from "./models/Note";
import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "test-database-instance.chazibtdctxl.eu-north-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: process.env.aws_pass,
    database: "bigbrain",
    entities: [User, Bodyweight, Note],
    logging: true,
    synchronize: true,
});
