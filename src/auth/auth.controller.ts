import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){

  }
  @Get('jwt')
  async generateToken(){
    return this.authService.generateToken();
   // return this.appService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(){
    return "hello world";
    // return this.appService.getHello();
  }
}
