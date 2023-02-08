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
    })
    @IsString()
      id?: string;

    // kullanıcı rolü
    @ApiProperty({
        nullable: false,
        enum: Role,
        example:0,
        default:3
    })
    @IsEnum(Role)
    status: Role;
    role: number

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

    // güncellenme tarihi
    @ApiProperty({
        nullable: false,
        default: Date.now()
    })
    @IsDate()
    updatedDate: Date

    //kullanıcı ismi
    @ApiProperty({
        nullable: false,
    })
    @IsString()
    fullName: string

    //doğum tarihi
    @ApiProperty({
        nullable: false,
    })
    @IsDate()
    birthDayDate: Date

    //mail
    @ApiProperty({
        nullable: false,
        uniqueItems:true
    })
    @IsString()
    mail: string

    //telefon
    @ApiProperty({
        nullable: false,
    })
    @IsString()
    phoneNumber: string

    // mail durumu
    @ApiProperty({
        nullable: false,
        example:false,
        default:false
    })
    @IsBoolean()
    isMail: boolean

    // eczane
    @ApiProperty({
        nullable: true,
        default:""
    })
    @IsObjectId()
    pharmcyId: string

    // oluşturan kişi
    @ApiProperty({
        nullable: true,
        default:""
    })
    @IsObjectId()
    createdById: string

    // güncelleyen kişi
    @ApiProperty({
        nullable: true,
        default:""
    })
    @IsObjectId()
    updatedById: string

    // adres
    @ApiProperty({
        nullable: false,
    })
    @IsString()
    adress: string

    // kimlik bilgisi
    @ApiProperty({
        nullable: false,
        uniqueItems:true
    })
    @IsString()
    identityId: string

}
