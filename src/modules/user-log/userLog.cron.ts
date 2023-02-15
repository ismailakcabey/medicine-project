import { Injectable , Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UserRequestService } from "./userLog.service";
@Injectable()
export class UserLogCron{
    constructor(
        private readonly userLogService: UserRequestService,
        private readonly logger = new Logger(UserLogCron.name)
    ){}
    
    @Cron('5 * * * * *',{
        name:'deleteLogObject'
    })
    deleteLogCron(){
        console.log('Log Kayitlari siliniyor')
        this.userLogService.deleteReq()
        this.logger.debug("her 5 sn de çalışıyor")
        return true
    }
}