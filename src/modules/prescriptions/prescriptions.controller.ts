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
import { ApiTags } from '@nestjs/swagger'
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


}