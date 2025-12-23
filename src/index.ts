


import express, { Router } from "express";
import wxAuthentication from "./authentication/wx.authentication.ts";
import chat from "./chat/chat.ts";

const router:Router = express.Router();

// 微信公众号认证
router.get("/wxChat",wxAuthentication)

// 处理微信消息
router.post("/wxChat",chat);

export default router;
