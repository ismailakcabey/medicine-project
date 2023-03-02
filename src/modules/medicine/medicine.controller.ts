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
    Param,
    CACHE_MANAGER,
    Inject
} from '@nestjs/common'
import { Filter } from 'mongodb'
import { ApiTags } from '@nestjs/swagger'
import { Response, Request, request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { MedicineService } from './medicine.service'
import { MedicineDto } from './medicine.dto'
import { Cache } from "cache-manager";
@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly medicineService: MedicineService,
        private jwtService: JwtService,
    ){}

    @Post()
    async insertMedicine(
        @Body() addMedicine: MedicineDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            addMedicine.createdById = data.id
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.cacheManager.del('medicines');
        return await this.medicineService.medicineInsert(addMedicine)
        } catch (error) {
            return{
                status:false,
                message: error.message
            }
        }
    }


    @Patch(':id')
    async patchPhamarcyById(
        @Param('id') id : string,
        @Body() update: MedicineDto,
        @Req() request : Request
    ){
        try {
            const cookie = request.headers.authorization
         const data = await this.jwtService.verifyAsync(cookie);
         if (!data) {
             throw new UnauthorizedException();
         }
         update.updatedDate = new Date
         update.updatedById = data.id
         await this.cacheManager.del('medicines');
        return await this.medicineService.medicineUpdate(id, update)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }


    @Delete(':id')
    async deleteMedicine(
        @Param('id') id:string,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        await this.cacheManager.del('medicines');
        return await this.medicineService.medicineDel(id)
        } catch (error) {
            return{
                status:false,
                message: error.message
            }
        }
    }

    @Get(':id')
    async getMedicineById(
        @Param('id') id:string,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        return await this.medicineService.getMedicineById(id)
        } catch (error) {
            return{
                status:false,
                message: error.message
            }
        }
    }


    @Get()
    async getMedicine(
        @Query() medicineDto: MedicineDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
              const data = await this.jwtService.verifyAsync(cookie);
          if (!data) {
              throw new UnauthorizedException();
          }
          const redisData = await this.cacheManager.get('medicines')
          if(redisData === undefined || redisData == null){
            const datas = await this.medicineService.getMedicine(medicineDto)
            await this.cacheManager.set('medicines',datas);
            return datas
          }
          else{
            return redisData
          }
        } catch (error) {
            return{
                status:false,
                message:error.message
             }   
        }

    }
}