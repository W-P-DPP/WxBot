import type { Request, Response } from "express";
import { parseXML } from "../../utils/parseXML.ts";

const chat = async (req: Request, res: Response) => {
  const xml = req.body;
  const json = await parseXML(xml);
  const msg = json.xml;
  const toUser = msg.FromUserName[0];
  const fromUser = msg.ToUserName[0];
  const msgType = msg.MsgType[0];
  const content = msg.Content ? msg.Content[0] : "";

  let reply = "";
  if (msgType === "text") {
    reply = `<xml>
            <ToUserName><![CDATA[${toUser}]]></ToUserName>
            <FromUserName><![CDATA[${fromUser}]]></FromUserName>
            <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[You said: ${content}]]></Content>
        </xml>`;
  }
  res.type("application/xml");
  res.send(reply);
};

export default chat;
