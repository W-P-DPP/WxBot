import type { Request, Response } from "express";
import { parseXML } from "../../utils/parseXML.ts";

const chat = async (req: Request, res: Response) => {
  const xml = req.body;
  const json = await parseXML(xml);
  const msg = json.xml;
  const toUser = msg.ToUserName;
  const fromUser = msg.FromUserName;
  const msgType = msg.MsgType;
  const content = msg.Content  || "";
  let reply = "";
  if (msgType === "text") {
    reply = `<xml>
            <ToUserName><![CDATA[${fromUser}]]></ToUserName>
            <FromUserName><![CDATA[${toUser}]]></FromUserName>
            <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[You said: ${content}]]></Content>
        </xml>`;
  }
  res.type("application/xml");
  res.send(reply);
};

export default chat;
