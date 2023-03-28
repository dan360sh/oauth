import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.split(" ");
      if(bearerToken[0] !== 'Bearer' || !bearerToken[1]){
        throw new  UnauthorizedException({message: 'Пользователь не авторизован'});
      }
        const user = this.jwtService.verify(bearerToken[1]);
        req.user = user;
      return true;
    }catch (e){
      throw new  UnauthorizedException({message: 'Пользователь не авторизован'});
    }
    return undefined;
  }

}