import {
    IsString,
    IsEnum,
    IsDate,
    IsNumber,
    IsBoolean
} from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { ApiProperty } from '@nestjs/swagger'

export class MedicineDto{

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
    babyEssentialMedicineList: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    name: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    barcode: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    atccode: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    childEssentialMedicineList: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    atcName: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    componayName: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    desc: string


    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsObjectId()
    prescriptions: string

    @ApiProperty({
        nullable: true,
        required:false,
        
    })
    @IsNumber()
    limit: number


}