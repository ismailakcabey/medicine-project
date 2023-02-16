import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsDate,
    IsNumber,
    IsBoolean,
} from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { Role } from './user.enum'
import { ObjectId } from 'mongodb'
import { ApiProperty } from '@nestjs/swagger'
import mongoose from 'mongoose'

export class UserDto {

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
      id?: string;

    // kullanıcı rolü
    @ApiProperty({
        nullable: false,
        enum: Role,
        example:0,
        default:3,
        required:false
    })
    @IsEnum(Role)
    status: Role;
    role: number

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
        required:false,
        default: Date.now()
    })
    @IsDate()
    createdDate: Date

    // güncellenme tarihi
    @ApiProperty({
        nullable: false,
        default: Date.now(),
        required:false
    })
    @IsDate()
    updatedDate: Date

    //kullanıcı ismi
    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    fullName: string

    //kullanıcı şifre
    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    password: string

    //doğum tarihi
    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsDate()
    birthDayDate: Date

    //mail
    @ApiProperty({
        nullable: false,
        uniqueItems:true,
        required:false
    })
    @IsString()
    mail: string

    //telefon
    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    phoneNumber: string

    // mail durumu
    @ApiProperty({
        nullable: false,
        example:false,
        default:false,
        required:false
    })
    @IsBoolean()
    isMail: boolean

    // eczane
    @ApiProperty({
        nullable: true,
        default:"",
        required:false
    })
    @IsObjectId()
    pharmcyId: string

    // oluşturan kişi
    @ApiProperty({
        nullable: true,
        required:false
    })
    @IsObjectId()
    createdById: string

    // güncelleyen kişi
    @ApiProperty({
        nullable: true,
        default:"",
        required:false,
        
    })
    @IsObjectId()
    updatedById: string

    // adres
    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    adress: string

    // kimlik bilgisi
    @ApiProperty({
        nullable: false,
        uniqueItems:true,
        required:false
    })
    @IsString()
    identityId: string

}
