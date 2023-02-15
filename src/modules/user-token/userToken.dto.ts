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

export class UserTokenDto{

    @ApiProperty({
        nullable: false,
        example:false,
        default:false,
        required:false
    })
    @IsBoolean()
    deleted: boolean
    

    @ApiProperty({
        nullable: false,
        default: Date.now(),
        required:false
    })
    @IsDate()
    createdDate: Date


    @ApiProperty({
        nullable: true,
        default:"",
        required:false
    })
    @IsObjectId()
    createdById: string

    @ApiProperty({
        nullable: true,
        default:"",
        required:false
    })
    @IsObjectId()
    token: string


}