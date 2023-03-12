import db_conn from "../db_conn";
import { Bodyweight } from "../models/Bodyweight";
import { User } from "../models/User";
import { validate } from "uuid";
import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

const bwRepo = db_conn.getRepository(Bodyweight);
const userRepo = db_conn.getRepository(User);

router.get("/bodyweight", async (req: Request, res: Response) => {
    const entries = await bwRepo.find();
    res.json(entries);
});

router.get("/bodyweight/:uuid", async (req: Request, res: Response) => {
    if (validate(req.params.uuid)) {
        const user = await userRepo.findOneBy({ user_uuid: req.params.uuid });
        if (user === null) {
            res.status(404).send({ error: "No user found with this uuid" });
        } else {
            res.send(user.bw_entries);
        }
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
    }
});

router.post("/bodyweight", async (req: Request, res: Response) => {
    if (validate(req.body.uuid)) {
        const user = await db_conn
            .getRepository(User)
            .findOneBy({ user_uuid: req.body.uuid });
        if (user === null) {
            res.status(404).send({ error: "No user found with this uuid" });
        } else {
            const entry = new Bodyweight();
            entry.kg = req.body.kg;
            entry.user = user;
            bwRepo.save(entry);
            res.status(201).send({ message: "Bodyweight entry created" });
        }
    } else {
        res.status(400).send({ error: "Invalid uuid parameter" });
    }
});

// router.patch("/users/:uuid", async (req: Request, res: Response) => {
//     if (validate(req.params.uuid)) {
//         const userToUpdate = await userRepo.findOneBy({
//             user_uuid: req.params.uuid,
//         });
//         if (userToUpdate === null) {
//             res.status(404).send({ error: "No user found with this uuid" });
//         } else {
//             userToUpdate.username = req.body.username;
//             userRepo.save(userToUpdate);
//             res.status(200).send({ message: "User updated" });
//         }
//     } else {
//         res.status(400).send({ error: "Invalid uuid parameter" });
//     }
// });

// router.delete("/users/:uuid", async (req: Request, res: Response) => {
//     if (validate(req.params.uuid)) {
//         const result = await userRepo.delete(req.params.uuid);

//         if (result.affected === 1) {
//             res.status(200).send({ message: "User deleted" });
//         } else {
//             res.status(404).send({ error: "No user found with this uuid" });
//         }
//     } else {
//         res.status(400).send({ error: "Invalid uuid parameter" });
//     }
// });

module.exports = router;
