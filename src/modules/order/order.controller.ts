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
import { OrderService } from './order.service'
import { OrderDto } from './order.dto'

@ApiTags('Order')
@Controller('order')
export class OrderController{
    constructor(
        private readonly orderService: OrderService,
        private jwtService: JwtService
    ){}

    @Post()
    async insertOrder(
        @Body() order: OrderDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        order.createdById = data.id
        return await this.orderService.insertOrder(order)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @Get()
    async getOrders(
        @Query() order:OrderDto,
        @Req() request:Request
    ){
        const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
        return await this.orderService.getOrders(order)
    }

    @Get(':id')
    async getOrderById(
        @Param('id') id: string,
        @Req() request:Request
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
        return await this.orderService.getOrderById(id)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @Get('/pharmcy/:id')
    async getOrderByPhamarcy(
        @Param('id') id: string,
        @Req() request:Request,
        @Query() filter: OrderDto
    ){
        try {
            const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
        return await this.orderService.getOrderByPhamarcyId(id,filter)
        } catch (error) {
            return{
                status:false,
                message:error.message
            }
        }
    }

    @Patch(':id')
    async updateOrder(
        @Param('id') id: string,
        @Body() orders: OrderDto,
        @Req() request: Request
    ){
        const cookie = request.headers.authorization
             const data = await this.jwtService.verifyAsync(cookie);
             if (!data) {
                 throw new UnauthorizedException();
             }
             orders.updatedById=data.id
        return await this.orderService.updateOrder(id,orders)
    }

    @Post('callBack')
    async callBackOrder(
        @Body() orders: any,
    ){
        const result = await this.orderService.callBackOrder(orders.customer_order_id,orders)
        return result
    }

    @Get('/excel/export')
    async getUserExcel(
        @Req() request: Request,
        @Query() orderDto: OrderDto,
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const orders = await this.orderService.getOrderExcel(orderDto);
        return orders
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }
}