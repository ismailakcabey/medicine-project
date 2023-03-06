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
import { PhamarcyDto } from './phamarcy.dto'
import { PhamarcyService } from './phamarcy.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response, Request, request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { th } from 'date-fns/locale'

@ApiTags('Phamarcy')
@Controller('phamarcy')
export class PhamarcyController{
    constructor(
        private readonly phamarchService: PhamarcyService,
        private jwtService: JwtService,
    ){}

    @ApiOperation({ summary: 'Phamarcy Create', description: 'API to use to create phamarcy' })
    @Post()
    async insertPhamarcy(
        @Body() addPhamarcy: PhamarcyDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            addPhamarcy.createdById = data.id
        if (!data) {
            throw new UnauthorizedException();
        }
        return await this.phamarchService.insertPhamarcy(addPhamarcy)
        } catch (error) {
            return{
                status:false,
                message: error.message
            }
        }
    }

    @ApiOperation({ summary: 'Phamarcy View', description: 'API to use to list phamarcy' })
    @Get()
    async getAllPhamarcy(
        @Query() pharmacyDto : PhamarcyDto,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
              const data = await this.jwtService.verifyAsync(cookie);
          if (!data) {
              throw new UnauthorizedException();
          }
        return await this.phamarchService.getPhamarcy(pharmacyDto)
        } catch (error) {
         return{
            status:false,
            message:error.message
         }   
        }
    }

    @ApiOperation({ summary: 'Phamarcy View', description: 'API to use to view a phamarcy' })
    @Get(':id')
    async getPhamarcyById(
        @Param('id') id : string,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
            return await this.phamarchService.getPhamarcyById(id)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Phamarcy View', description: 'API that lists phamarcy belonging to the prescriptions' })
    @Get('prescriptions/:id')
    async getPriscriptonsByPhamarcyById(
        @Param('id') id : string,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
            return await this.phamarchService.getPrescriptions(id)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Phamarcy Update', description: 'API to be used to update the phamarcy' })
    @Patch(':id')
    async patchPhamarcyById(
        @Param('id') id : string,
        @Body() update: PhamarcyDto,
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
        return await this.phamarchService.updatePhamarcy(id, update)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @ApiOperation({ summary: 'Phamarcy Delete', description: 'API to be used to delete the phamarcy' })
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
        return await this.phamarchService.deletePhamarcyById(id)
        } catch (error) {
            
        }

    }

    @ApiOperation({ summary: 'Phamarcy Excel Export', description: 'It is the API used to download the list of phamarcy to excel' })
    @Get('/excel/export')
    async getPhamarcyExcel(
        @Req() request: Request,
        @Query() phamarcyDto: PhamarcyDto,
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const prescriptions = await this.phamarchService.getPhamarcyExcel(phamarcyDto);
        return prescriptions
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }


}