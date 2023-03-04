// cronimport { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrescriptionsLogService } from './prescriptionsLog.service';

export class PrescriptionsLogCron{
    constructor(
        private prescriptionsLogService: PrescriptionsLogService
    ){}
    @Cron(CronExpression.EVERY_WEEKEND)
    handleCron(){
        const result = this.prescriptionsLogService.deleteReq()
        console.log("Get method delete for prescriptions log",result)
    }
}