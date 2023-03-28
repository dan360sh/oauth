import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Roles } from "./roles-auth.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){

  }
  @Get('jwt')
  async generateToken(){
    return this.authService.generateToken();
   // return this.appService.getHello();
  }
  @Roles("admon")
  // @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(){
    return this.authService.test();
    // return this.appService.getHello();
  }
}
