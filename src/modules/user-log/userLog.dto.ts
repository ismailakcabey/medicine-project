import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsDate,
    IsNumber,
    IsBoolean,
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
    @IsString()
    body: String

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
    @IsString()
    query: String

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    params: String

    @ApiProperty({
        nullable: false,
        default: ''
    })
    @IsString()
    method: String

}