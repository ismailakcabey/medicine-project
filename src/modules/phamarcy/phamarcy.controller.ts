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
import { ApiTags } from '@nestjs/swagger'
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

    @Post()
    async insertPhamarcy(
        @Body() addPhamarcy: PhamarcyDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            console.log(data)
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


    @Get()
    async getAllPhamarcy(
        @Query() pharmacyDto : PhamarcyDto,
        @Req() request : Request
    ){
        try {
            const cookie = request.cookies['jwt'];
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


    @Get(':id')
    async getPhamarcyById(
        @Param('id') id : string,
        @Req() request : Request
    ){
        try {
            const cookie = request.cookies['jwt'];
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


    @Patch(':id')
    async patchPhamarcyById(
        @Param('id') id : string,
        @Body() update: PhamarcyDto,
        @Req() request : Request
    ){
        try {
            const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        update.updatedById = data.id
        return await this.phamarchService.updatePhamarcy(id, update)
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
            const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        return await this.phamarchService.deletePhamarcyById(id)
        } catch (error) {
            
        }

    }


}