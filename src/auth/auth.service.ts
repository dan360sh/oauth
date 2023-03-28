import { Get, Injectable, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }
  async generateToken(){
    const payload = {id: "4343434", roles: ["pidor"]};
    return "Bearer " + this.jwtService.sign(payload);
  }

  async test(){
    return "Вы прошли тест";
  }

}
