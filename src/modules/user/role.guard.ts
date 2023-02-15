import { CanActivate , ExecutionContext , Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { UserService } from "./user.service";
import { UserTokenService } from "../user-token/userToken.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflactor: Reflector,
        private userTokenService: UserTokenService,
        private userService: UserService
    ){}
    canActivate(context: ExecutionContext)
    :
    boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflactor.get<string[]>('roles', context.getHandler())
        const request = context.switchToHttp().getRequest()
        return true    
    }
}