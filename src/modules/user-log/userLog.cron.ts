import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRequestService } from './userLog.service';

@Injectable()
export class UserLogCron {
    constructor(
        private userReqService: UserRequestService,
    ){}
  @Cron(CronExpression.EVERY_WEEKEND)
  handleCron() {
    const result = this.userReqService.deleteReq()
    console.log('Get method record deleted', result);
  }
}

