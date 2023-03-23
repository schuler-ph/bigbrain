import { Request, Response } from "express";
import { validateUuidEntity } from "src/helpers/uuid";
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
    if (await validateUuidEntity(req.params.uuid, res, "user")) {
        const bw_entries = await bodyweightRepo.find({
            where: {
                user: {
                    user_uuid: req.params.uuid,
                },
            },
        });
        res.json(bw_entries);
    }
});

// post one entry
router.post("/bodyweight", async (req: Request, res: Response) => {
    if (await validateUuidEntity(req.body.uuid, res, "user")) {
        const alreadyExists = await bodyweightRepo.find({
            where: {
                fk_user_bw: req.body.uuid,
                measured_at: req.body.measured_at,
            },
        });

        if (alreadyExists === null) {
            const bwEntry = bodyweightRepo.create({
                kg: req.body.kg,
                measured_at: req.body.measured_at,
                fk_user_bw: req.body.uuid,
            });
            bodyweightRepo.save(bwEntry);
            res.status(201).send({ message: "Bodyweight entry created" });
        } else if (req.body.force) {
            alreadyExists.kg = req.body.kg;
            bodyweightRepo.save(alreadyExists);
            res.status(200).send({ message: "Bodyweight entry updated" });
        } else {
            res.status(409).send({ error: "Data already exists for this day" });
        }
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
