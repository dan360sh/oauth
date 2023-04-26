import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Session, SessionDocument} from "../schemas/session";
import {Model} from "mongoose";
import {User, UserDocument} from "../schemas/users";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>
    ) {
    }

    async generateToken(payload: any) {
        return {
            token: this.jwtService.sign(payload)
        }
    }

    /**
     * Обновляет токен.
     * @param token
     */
    async updateToken(token: string) {
        try {
            this.verify(token);
        } catch (error) {
            if (error.message === "jwt expired") {
              return this.sessionVerification(token);
            }
            return new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
        return this.sessionVerification(token);
    }
    private async sessionVerification(token: string){
      const payload = this.payload(token);
      const user = await this.userModel.findOne({_id: payload.id});
      const session = await this.sessionModel.findOneAndUpdate(
          {_id: payload.session, numberUpdate: payload.numberUpdate },
          { $inc: {numberUpdate: 1}});
      if(session && user){
          session.save();
          console.log(session, 'session');
          return await this.generateToken({
              id: user._id,
              roles: user.roles,
              session: session._id,
              numberUpdate: session.numberUpdate + 1
          });
      }else{
          return new UnauthorizedException({message: 'Пользователь не авторизован'});
      }
    }

    verify(token: string): any {
        try {
            const bearerToken = token.split(" ");
            if (bearerToken[0] !== 'Bearer' || !bearerToken[1]) {
                return new UnauthorizedException({message: 'Пользователь не авторизован'});
            }
            return this.jwtService.verify(bearerToken[1]);
        } catch (e) {
            throw e;
        }
    }

    payload(token: string): any {
        const t = token.split(" ")[1];
        const s = t.split('.')[1];
        return JSON.parse(Buffer.from(s, 'base64').toString('utf8'));
    }


}
