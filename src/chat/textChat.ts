
import type { Request, Response } from "express";

const textChat = (msg: IChat, res:Response) => {
       const toUser = msg.ToUserName;
    const fromUser = msg.FromUserName;
    const content = msg.Content || "";
    let reply = "";
     reply = `<xml>
            <ToUserName><![CDATA[${fromUser}]]></ToUserName>
            <FromUserName><![CDATA[${toUser}]]></FromUserName>
            <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[You said: ${content}]]></Content>
        </xml>`;
         res.type("application/xml");
    res.send(reply);

}   

export default textChat;