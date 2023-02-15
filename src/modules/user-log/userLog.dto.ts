import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsDate,
    IsNumber,
    IsBoolean,
    IsObject,
} from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { ObjectId } from 'mongodb'
import { ApiProperty } from '@nestjs/swagger'
import mongoose from 'mongoose'

export class UserLogDto{

    @ApiProperty({
        nullable: false,
    })
    @IsString()
      id?: string;

    // silinme durumu
    @ApiProperty({
        nullable: false,
        example:false,
        default:false
    })
    @IsBoolean()
    deleted: boolean

    // oluşturulma tarihi
    @ApiProperty({
        nullable: false,
        default: Date.now()
    })
    @IsDate()
    createdDate: Date


    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsObject()
    body: Object

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    cookies: String

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsObject()
    query: Object

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsObject()
    params: Object

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    method: String

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    ip: String

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    url: String

}