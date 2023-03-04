import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { OrderLogService } from "../order-log/orderLog.service";

@Injectable()
export class LoggerOrderMiddleware implements NestMiddleware{
    constructor(
        private jwtService: JwtService,
        private orderLogService: OrderLogService
    ){}

    async use(req: any, res: any, next: (error?: any) => void) {
        const request = {
            cookies: req.headers.authorization,
            params: req.params,
            query: req.query,
            body: req.body,
            method: req.method,
            deleted: false,
            createdDate: new Date,
            ip: req.ip,
            url: req.url
        }
        const result = await this.orderLogService.insertLog(request)
        next()
    }
}