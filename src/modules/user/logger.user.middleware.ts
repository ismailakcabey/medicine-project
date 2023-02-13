import { NestMiddleware , Injectable } from "@nestjs/common";
import { Request , Response } from "express";

@Injectable()
export class LoggerUserMiddleware implements NestMiddleware{
    use(req:Request , res:Response , next: ()=>void){
        console.log('Request geldi :')
        console.log('JWT : ' + JSON.stringify(req.cookies?.jwt))
        console.log('Method :' + JSON.stringify(req.method))
        console.log('Param :' + JSON.stringify(req.params))
        console.log('query  :' + JSON.stringify(req.query))
        console.log('body  :' + JSON.stringify(req.body))
        next()
    }
}