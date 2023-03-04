import {
    IsString,
    IsEnum,
    IsDate,
    IsNumber,
    IsBoolean,
    IsArray
} from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { ApiProperty } from '@nestjs/swagger'

export class OrderDto{

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
      id?: string;

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
        required:false,
        default: Date.now()
    })
    @IsDate()
    createdDate: Date


    @ApiProperty({
        nullable: false,
        default: Date.now(),
        required:false
    })
    @IsDate()
    updatedDate: Date


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    fromUserName: string

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsNumber()
    limit: number

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    externalId: string


    @ApiProperty({
        nullable: false,
        required:false,
        default:0
    })
    @IsNumber()
    status: number

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    toUserName: string


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    toPhoneNumber: string

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    fromPhoneNumber: string


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    toAdress: string

    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    fromAdress: string

    @ApiProperty({
        nullable: true,
        required:false
    })
    @IsObjectId()
    createdById: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    updatedById: string

    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    phamarcyId: string

    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    prescriptionId: string

}