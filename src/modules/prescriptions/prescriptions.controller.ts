import {
    Controller,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Query,
    BadRequestException,
    Res,
    Req,
    UnauthorizedException,
    Get,
    Param
} from '@nestjs/common'
import { Filter } from 'mongodb'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response, Request, request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { th } from 'date-fns/locale'
import { PrescriptionsService } from './prescriptions.service'
import { PrescriptionsDto } from './prescriptions.dto'

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionsController{
    constructor(
        private readonly prescriptionsService: PrescriptionsService,
        private jwtService: JwtService
    ){}

    @ApiOperation({ summary: 'Prescriptions Create', description: 'API to use to create prescriptions' })
    @Post()
    async insertPrescriptions(
        @Body() addPresction: PrescriptionsDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            addPresction.createdById = data.id
        if (!data) {
            throw new UnauthorizedException();
        }
        return await this.prescriptionsService.insertPrescriptions(addPresction)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Prescriptions View', description: 'API to use to list prescriptions' })
    @Get()
    async getPrescriptions(
        @Query() addPresction: PrescriptionsDto,
        @Req() request: Request 
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
            return await this.prescriptionsService.getPrescriptions(addPresction)
        } catch (error) {
            
        }
    }

    @ApiOperation({ summary: 'Prescriptions View', description: 'API to use to view a prescriptions' })
    @Get(':id')
    async getPrescriptionsById(
        @Param('id') id : string,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
            return await this.prescriptionsService.getPrescriptionsById(id)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Prescriptions Update', description: 'API to be used to update the prescriptions' })
    @Patch(':id')
    async patchPhamarcyById(
        @Param('id') id : string,
        @Body() update: PrescriptionsDto,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
         const data = await this.jwtService.verifyAsync(cookie);
         if (!data) {
             throw new UnauthorizedException();
         }
         update.updatedById = data.id
         update.updatedDate = new Date
         if(update.medicines){
            update.medicineCount = update.medicines.length
         }
        return await this.prescriptionsService.updatePrescriptions(id, update)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Prescriptions Delete', description: 'API to be used to delete the prescriptions' })
    @Delete(':id')
    async deletePhamarcyById(
        @Param('id') id : string,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
         const data = await this.jwtService.verifyAsync(cookie);
         if (!data) {
             throw new UnauthorizedException();
         }
        return await this.prescriptionsService.deletePrescriptions(id)
        } catch (error) {
            
        }

    }

    @ApiOperation({ summary: 'Prescriptions Excel Export', description: 'It is the API used to download the list of prescriptions to excel' })
    @Get('/excel/export')
    async getPrescriptionExcel(
        @Req() request: Request,
        @Query() prescriptionsDto: PrescriptionsDto,
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const prescriptions = await this.prescriptionsService.getPrescriptionsExcel(prescriptionsDto);
        return prescriptions
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }
}