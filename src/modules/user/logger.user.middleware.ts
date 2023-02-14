import { NestMiddleware , Injectable } from "@nestjs/common";
import { Request , Response } from "express";
import { UserRequestService } from "../user-log/userLog.service";
import * as moment from 'moment';
import { format } from 'date-fns';
import { UserDto } from "./user.dto";

@Injectable()
export class LoggerUserMiddleware implements NestMiddleware{
    constructor(
        private userRequestService: UserRequestService
        
    ){}
    use(req:Request , res:Response , next: ()=>void){

        const request = {
            cookies: JSON.stringify(req.cookies),
            params: JSON.stringify(req.params),
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
            method: req.method,
            deleted: false,
            createdDate: new Date
            
        }
        const newReq = new UserDto()
        const result = this.userRequestService.insertRequest(request)
        next()
    }
}