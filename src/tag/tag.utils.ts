

import { getToken } from "utils/getToken.ts"
import {Logger} from "utils/index.ts"
import AxiosService from "utils/Axios.ts";
import config from "../config.ts";
const getTags= ()=>{
    const logger = Logger.getInstance();
    return new Promise(async (resolve, reject)=>{
        try {
            const access_token = await getToken();
            const url = `tags/get?access_token=${access_token}`;
            console.log("获取标签URL:", url);
            const axiosService = AxiosService.getInstance();
            const response = await axiosService.getAxios().get(url);
            logger.info(`获取标签成功: ${JSON.stringify(response.data)}`);
            resolve(response.data);
        } catch (error) {
            logger.error(`获取标签失败: ${error}`);
            reject(error);
        }
    })
}

export {getTags}