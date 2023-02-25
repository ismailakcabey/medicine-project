import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PhamarcyLogService } from './phamarcyLog.service';

export class PhamarcyLogCron{
    constructor(
        private phamarcyLogService: PhamarcyLogService
    ){}
    @Cron(CronExpression.EVERY_WEEKEND)
    handleCron(){
        const result = this.phamarcyLogService.deleteReq()
        console.log("Get method delete for phamarcy log",result)
    }
}