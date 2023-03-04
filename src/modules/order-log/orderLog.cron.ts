import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderLogService } from './orderLog.service';

export class OrderLogCron{
    constructor(
        private orderLogService: OrderLogService
    ){}
    @Cron(CronExpression.EVERY_WEEKEND)
    handleCron(){
        const result = this.orderLogService.deleteReq()
        console.log("Get method delete for order log",result)
    }
}