import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { PrescriptionsLogService } from "../prescriptions-log/prescriptionsLog.service";

@Injectable()
export class LoggerPrescriptionsMiddleware implements NestMiddleware{
    constructor(
        private jwtService: JwtService,
        private prescriptionsLogService: PrescriptionsLogService
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
        const result = await this.prescriptionsLogService.insertLog(request)
        next()
    }
}