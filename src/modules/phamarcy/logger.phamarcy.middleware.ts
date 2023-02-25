import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";
import { PhamarcyLogService } from "../phamarcy-log/phamarcyLog.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoggerPhamarcyMiddleware implements NestMiddleware{
    constructor(
        private phamarcyLogService: PhamarcyLogService,
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
        const cookie = req.headers.authorization
        if(cookie !== undefined){
            const data = await this.jwtService.verifyAsync(cookie);
        }
        const result = this.phamarcyLogService.insertLog(request)
        next()
    }
}