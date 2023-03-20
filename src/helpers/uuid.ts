import { validate } from "uuid";
import { Response } from "express";
import { userRepo } from "src/db_conn";

export const validateUuid = (uuid: string, res: Response) => {
    if (validate(uuid)) {
        return true;
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
        return false;
    }
};

export const validateUuidEntity = async (
    uuid: string,
    res: Response,
    entity: String
) => {
    let result = null;
    if (validateUuid(uuid, res)) {
        switch (entity) {
            case "user":
                result = await userRepo.findOne({
                    where: {
                        user_uuid: uuid,
                    },
                });
                break;
        }

        if (result === null) {
            res.status(404).send({
                error: `No ${entity} entry found with this uuid`,
            });
        }
    }
    return result;
};
