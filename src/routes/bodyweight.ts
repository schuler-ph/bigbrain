import { User } from "../models/User";
import { Request, Response } from "express";
import { getEntryByUuid } from "../helpers/uuid";
import { bodyweightRepo } from "src/db_conn";

const express = require("express");
const router = express.Router();

// get all entries
router.get("/bodyweight", async (req: Request, res: Response) => {
    const bwEntries = await bodyweightRepo.find({
        relations: {
            user: true,
        },
    });
    res.json(bwEntries);
});

// get all entries from user uuid
router.get("/bodyweight/:uuid", async (req: Request, res: Response) => {
    const user = <User>await getEntryByUuid(req.params.uuid, "user", res);
    if (user !== null) {
        const bw_entries = await bodyweightRepo.findBy({ user: user });
        res.send(bw_entries);
    }
});

// post one entry
router.post("/bodyweight", async (req: Request, res: Response) => {
    const user = <User>await getEntryByUuid(req.body.uuid, "user", res);
    if (user !== null) {
        const bwEntry = bodyweightRepo.create({
            kg: req.body.kg,
            user,
        });
        bodyweightRepo.save(bwEntry);
        res.status(201).send({ message: "Bodyweight entry created" });
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
