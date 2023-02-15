import { SetMetadata } from "@nestjs/common";
import { Role } from "./user.enum";

export const Roles = (...args: Role[])=> SetMetadata('roles', args);
