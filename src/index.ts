


import express, { Router } from "express";
import wxAuthentication from "./authentication/wx.authentication.ts";
import chat from "./chat/chat.ts";
import { testGetToken } from "../test/testToken.ts";

const router:Router = express.Router();

// 微信公众号认证
router.get("/wxChat",wxAuthentication)

// 处理微信消息
router.post("/wxChat",chat);

router.get("/getToken",testGetToken)

export default router;
