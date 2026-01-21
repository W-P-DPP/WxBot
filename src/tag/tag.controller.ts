

import { getTags } from "./tag.utils.ts";
import type { Request, Response } from "express";

const getTagController = async (req: Request, res: Response) => {
    try {
        const tags = await getTags();
        res.status(200).send(tags);
    } catch (error) {
        res.status(500).send({ error: "Failed to get tags", details: error });
    }
}
export { getTagController };