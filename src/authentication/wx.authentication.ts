import type { Request, Response } from "express";
import crypto from "crypto";
import config from "../config.ts";

const wxAuthentication = (req: Request, res: Response) => {
    const { TOKEN } = config as { TOKEN?: string };
    const { signature, timestamp, nonce, echostr } = req.query;
    const str = [TOKEN, timestamp, nonce].sort().join('')
     const sha1 = crypto.createHash('sha1').update(str).digest('hex')
      if (sha1 === signature) {
            res.send(echostr)
        } else {
            res.send('error')
        }
};

export default wxAuthentication;