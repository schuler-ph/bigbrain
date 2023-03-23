import { validate } from "uuid";
import { Response } from "express";
import { userRepo } from "../db_conn";

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

export const requestBodyContains = (
    body: Object,
    res: Response,
    fields: string[]
) => {
    let valid = true;

    fields.forEach((f) => {
        if (!body.hasOwnProperty(f)) {
            valid = false;
        }
    });

    if (!valid) {
        res.status(400).send({ error: "Parameters missing in request body" });
    }

    return valid;
};

export const usernameAlreadyExists = async (username: string) => {
    return await userRepo.findOne({
        where: {
            username,
        },
    });
};

export const emailAlreadyExists = async (email: string) => {
    return await userRepo.findOne({
        where: {
            email,
        },
    });
};

export const usernameOrEmailAlreadyExists = async (
    username: string,
    email: string,
    res: Response
) => {
    if (await usernameAlreadyExists(username)) {
        res.status(409).send({ error: "Username already exists" });
        return true;
    }
    if (await emailAlreadyExists(email)) {
        res.status(409).send({ error: "Email already exists" });
        return true;
    }
    return false;
};
