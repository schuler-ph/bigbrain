import { Request, Response } from "express";
import { validateUuidEntity } from "src/helpers/uuid";
import { userRepo } from "src/db_conn";

const express = require("express");
const router = express.Router();

// get all users
router.get("/users", async (req: Request, res: Response) => {
    const users = await userRepo.find();
    res.json(users);
});

// get one user by uuid
router.get("/users/:uuid", async (req: Request, res: Response) => {
    const user = await validateUuidEntity(req.params.uuid, res, "user");
    if (user !== null) {
        res.json(user);
    }
});

// add new user
router.post("/users", (req: Request, res: Response) => {
    const user = userRepo.create({
        username: req.body.username,
    });
    userRepo.save(user);
    res.status(201).send({ message: "User created" });
});

// edit user
router.patch("/users/:uuid", async (req: Request, res: Response) => {
    const user = await validateUuidEntity(req.params.uuid, res, "user");
    if (user !== null) {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        userRepo.save(user);
        res.status(200).send({ message: "User updated" });
    }
});

// delete user
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
