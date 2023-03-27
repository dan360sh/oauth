import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization;
      console.log("вот заголовок "+ authHeader);
      const bearerToken = authHeader.split(" ");
      if(bearerToken[0] !== 'Bearer' || !bearerToken[1]){
        throw new  UnauthorizedException({message: 'Пользователь не авторизован'});
      }
      console.log("вот token "+ bearerToken[1]);
      try {
        const user = this.jwtService.verify(bearerToken[1], {
          publicKey: "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy62CMcBEXwsSQAmuy4cm\n" +
            "jjkkzrGQyy5nm3/wrNX3ssMEW9XU/qgv3h6+x+907xuRGH/G3xw/RcyOhI9x7fZq\n" +
            "SPXZKo8ccY86vpbEhIArKiISwf49miAqR4KxQlOW0upUy111zk1IbIC1Iq6IpSa0\n" +
            "oVpBOX0hpvY+KS1lp9QlleOxB4HPkJYR//5Q9IWQUpEWspzeEywiBXX53SS9qok1\n" +
            "reLeg9qU3l04o+EzWclqfdLUc+Xmbw1iMOqLGzcFxRfm5IQvxqAYbWuHHgVN/dLI\n" +
            "Ph9JTQNuxq7zPvJQWav8PMFcoqWnDGrTCQCyIvQCh9HoBDlrAnKoKyzlNDbYcT3Q\n" +
            "pwIDAQAB\n" +
            "-----END PUBLIC KEY-----",
          algorithms: ['RS256']
        });

        req.user = user;
        console.log("вот user " + user);
      }catch (e){
        console.log(e)
      }
      return true;
    }catch (e){
      throw new  UnauthorizedException({message: 'Пользователь не авторизован'});
    }
    return undefined;
  }

}