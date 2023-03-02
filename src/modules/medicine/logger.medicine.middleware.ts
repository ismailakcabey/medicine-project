import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { MedicineLogService } from "../medicine-log/medicineLog.service";

@Injectable()
export class LoggerMedicineMiddleware implements NestMiddleware{
    constructor(
        private medicineLogService: MedicineLogService,
        private jwtService: JwtService
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
        const result = this.medicineLogService.insertLog(request)
        next()
    }
}