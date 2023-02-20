import { NestMiddleware , Injectable, UnauthorizedException } from "@nestjs/common";
import { Request , Response } from "express";
import { UserRequestService } from "../user-log/userLog.service";
import * as moment from 'moment';
import { format } from 'date-fns';
import { UserDto } from "./user.dto";
import { UserTokenService } from "../user-token/userToken.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoggerUserMiddleware implements NestMiddleware{
    constructor(
        private userRequestService: UserRequestService,
        private userTokenService: UserTokenService,
        private jwtService: JwtService,
    ){}
    async use(req:Request , res:Response , next: ()=>void){
        
        const request = {
            cookies: req.cookies['jwt'],
            params: req.params,
            query: req.query,
            body: req.body,
            method: req.method,
            deleted: false,
            createdDate: new Date,
            ip: req.ip,
            url: req.url
        }
        const cookie = req.cookies['jwt'];
        const data = null
        if(cookie !== undefined){
            const data = await this.jwtService.verifyAsync(cookie);
        }
        //@ts-ignore
        if (!data && !(req.url === '/users/login')) {
            throw new UnauthorizedException();
            
        }
        console.log(res)
        const result = this.userRequestService.insertRequest(request)
        next()
    }
}