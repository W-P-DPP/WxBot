import { getToken } from "../utils/getToken.ts";
import type { Request, Response } from "express";


export async function testGetToken(req:Request,res:Response) {
    const token = await getToken();
    res.send({ access_token: token });
}