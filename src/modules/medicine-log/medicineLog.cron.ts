import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MedicineLogService } from './medicineLog.service';


export class MedicineLogCron{
    constructor(
        private medicineLogService: MedicineLogService
    ){}
    @Cron(CronExpression.EVERY_WEEKEND)
    handleCron(){
        const result = this.medicineLogService.deleteReq()
        console.log("Get method delete for phamarcy log",result)
    }
}