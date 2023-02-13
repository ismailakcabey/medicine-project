import { Injectable  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {JwtService} from "@nestjs/jwt";
import { UserRequestSchema , UserReq} from "./userLog.model";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export class UserRequestService {
    constructor(
        @InjectModel('MedicineUserRequestSchema') private readonly userReq: Model<UserReq>
    ){}
}