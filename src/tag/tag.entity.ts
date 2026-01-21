import { EntitySchema } from 'typeorm'
import {BaseSchemaColumns} from '../../utils/entities/base.entity.ts'

export interface ITag{
    id:number,
    name:string,
    count:number
}

export const TagEntity = new EntitySchema<ITag>({
    name:'Tag',
    tableName:'t_tag',
    columns:{
        ...BaseSchemaColumns,
        id:{
            type:Number,
            primary:true,
            generated:true,
            comment:"标签ID",
        },
        name:{
            type:String,
            length:125,
            comment:"标签名称"
        },
        count:{
            type:Number,
            comment:"粉丝数量"
        }
    }
})