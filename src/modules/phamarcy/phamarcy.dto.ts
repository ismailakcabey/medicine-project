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
import { Medicine } from '../medicine/medicine.model';

export class PhamarcyDto{

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
    phamarcyName: string


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsArray()
    medicines: Array<Medicine>


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsString()
    phoneNumber: string


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
        nullable: false,
        required:false
    })
    @IsString()
    adress: string


    @ApiProperty({
        nullable: false,
        required:false
    })
    @IsNumber()
    medicineCount: number


    @ApiProperty({
        nullable: false,
        required:false,
        default:20
    })
    @IsNumber()
    limit: number

}