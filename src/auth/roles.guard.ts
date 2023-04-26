import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ){
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      if(!requiredRoles){
        return true;
      }
      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.split(" ");
      if(bearerToken[0] !== 'Bearer' || !bearerToken[1]){
        throw new  HttpException('нет доступа', HttpStatus.FORBIDDEN);
      }

      const user = this.jwtService.verify(bearerToken[1]);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.value));;
    }catch (e){
      throw new  HttpException('нет доступа', HttpStatus.FORBIDDEN);
    }
    return undefined;
  }

}