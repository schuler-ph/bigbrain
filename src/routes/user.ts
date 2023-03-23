import { Request, Response } from "express";
import {
    requestBodyContains,
    usernameOrEmailAlreadyExists,
    validateUuidEntity,
} from "../helpers/uuid";
import { userRepo } from "../db_conn";

const express = require("express");
const router = express.Router();

// get all users
router.get("/users", async (req: Request, res: Response) => {
    req;
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
router.post("/users", async (req: Request, res: Response) => {
    if (
        requestBodyContains(req.body, res, ["username", "email", "password"]) &&
        !(await usernameOrEmailAlreadyExists(
            req.body.username,
            req.body.email,
            res
        ))
    ) {
        const user = userRepo.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        userRepo.save(user);
        res.status(201).send({ message: "User created" });
    }
});

// edit user
router.patch("/users/:uuid", async (req: Request, res: Response) => {
    const user = await validateUuidEntity(req.params.uuid, res, "user");
    if (
        user !== null &&
        requestBodyContains(req.body, res, ["username", "email"]) &&
        !(await usernameOrEmailAlreadyExists(
            req.body.username,
            req.body.email,
            res
        ))
    ) {
        user.username = req.body.username;
        user.email = req.body.email;

        userRepo.save(user);
        res.status(200).send({ message: "User updated" });
    }
});

// delete user
router.delete("/users/:uuid", async (req: Request, res: Response) => {
    if (await validateUuidEntity(req.params.uuid, res, "user")) {
        await userRepo.delete(req.params.uuid);
        res.status(200).send({ message: "User deleted" });
    }
});

module.exports = router;
