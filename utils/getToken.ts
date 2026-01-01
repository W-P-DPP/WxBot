

import AxiosService from "./Axios.ts";
import config from "../src/config.ts";
import RedisService from "./Redis.ts";
import { Logger } from './index.ts';
import {CacheConstants} from "./constant/CacheConstants.ts";

export async function getToken(): Promise<string>{
    const logger = Logger.getInstance();
    logger.info("Fetching access token...");
    // 优先从缓存取token
    const redisService = RedisService.getInstance();
    const cacheKey = `${CacheConstants.ACCESS_TOKEN_KEY}${config.AppID}`;
    const access_token = await redisService.get(cacheKey);
    if (access_token) {
        return access_token;
    }

    const axiosService = AxiosService.getInstance();
    const url = `token?grant_type=client_credential&appid=${config.AppID}&secret=${config.AppSecret}`;
    
    try {
        const response = await axiosService.getAxios().get(url);
        const { access_token, expires_in } = response.data;
        
        if (access_token) {
            await redisService.set(cacheKey, access_token, expires_in - 120); // 提前120秒过期
            return access_token as string;
        } else {
            logger.error(`Failed to get token: ${JSON.stringify(response.data)}`);
            throw new Error(`Failed to get token: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        logger.error(`Axios error: ${error}`);
        throw new Error(`Axios error: ${error}`);
    }
}