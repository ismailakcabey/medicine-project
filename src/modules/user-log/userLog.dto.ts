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
        required:false
    })
    @IsString()
      id?: string;

    // silinme durumu
    @ApiProperty({
        nullable: false,
        example:false,
        default:false,
        required:false
    })
    @IsBoolean()
    deleted: boolean

    // oluşturulma tarihi
    @ApiProperty({
        nullable: false,
        default: Date.now(),
        required:false
    })
    @IsDate()
    createdDate: Date


    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsObject()
    body: Object

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsString()
    cookies: String

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsObject()
    query: Object

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsObject()
    params: Object

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsString()
    method: String

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsString()
    ip: String

    @ApiProperty({
        nullable: false,
        default: '',
        required:false
    })
    @IsString()
    url: String

}