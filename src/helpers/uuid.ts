import { validate } from "uuid";
import { Response } from "express";
import { userRepo, bodyweightRepo, noteRepo } from "src/db_conn";

export const getEntryByUuid = async (
    uuid: string,
    type: string,
    res: Response
) => {
    let entry = null;
    if (validateUuid(uuid, res)) {
        switch (type) {
            case "user":
                entry = await userRepo.findOneBy({ user_uuid: uuid });
                break;
            case "bodyweight":
                entry = await bodyweightRepo.findOneBy({ bw_uuid: uuid });
                break;
            case "note":
                entry = await noteRepo.findOneBy({ note_uuid: uuid });
                break;
        }

        if (entry === null) {
            res.status(404).send({
                error: `No ${type} entry found with this uuid`,
            });
        }
    }

    return entry;
};

export const validateUuid = (uuid: string, res: Response) => {
    if (validate(uuid)) {
        return true;
    } else {
        res.status(400).send({ error: "Invalid uuid parameter " });
        return false;
    }
};
