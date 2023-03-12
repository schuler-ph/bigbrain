import db_conn from "../db_conn";
import { User } from "../models/User";
import { validate } from "uuid";
import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

const userRepo = db_conn.getRepository(User);

router.get("/users", async (req: Request, res: Response) => {
    const users = await userRepo.find();
    res.json(users);
});

router.get("/users/:uuid", async (req: Request, res: Response) => {
    if (validate(req.params.uuid)) {
        const user = await userRepo.findOneBy({ user_uuid: req.params.uuid });
        if (user === null) {
            res.status(404).send({ error: "No user found with this uuid" });
        } else {
            res.send(user);
        }
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
    }
});

router.post("/users", (req: Request, res: Response) => {
    const user = new User();
    user.username = req.body.username;
    userRepo.save(user);
    res.status(201).send({ message: "User created" });
});

router.patch("/users/:uuid", async (req: Request, res: Response) => {
    if (validate(req.params.uuid)) {
        const userToUpdate = await userRepo.findOneBy({
            user_uuid: req.params.uuid,
        });
        if (userToUpdate === null) {
            res.status(404).send({ error: "No user found with this uuid" });
        } else {
            userToUpdate.username = req.body.username;
            userRepo.save(userToUpdate);
            res.status(200).send({ message: "User updated" });
        }
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
    }
});

router.delete("/users/:uuid", async (req: Request, res: Response) => {
    if (validate(req.params.uuid)) {
        const result = await userRepo.delete(req.params.uuid);

        if (result.affected === 1) {
            res.status(200).send({ message: "User deleted" });
        } else {
            res.status(404).send({ error: "No user found with this uuid" });
        }
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
    }
});

module.exports = router;
