import {Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Token} from "./Token.decorator";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user/user.service";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {

    }

    @Get('update-token')
    @ApiBearerAuth()
    async updateToken(@Token() token){
        return this.authService.updateToken(token);
    }

    /**
     * Создает нового пользователя.
     */
    @ApiOperation({summary: "Получение токена "})
    @Get('new-user')
    async newUser() {
        return this.authService.generateToken(await this.userService.newUser());
    }

    /**
     * Регистрация аккаунта
     * @param createUser
     */
    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: CreateUserDto})
    //@UseGuards(JwtAuthGuard)
    //@Roles("newUser")
    @Post('create-account')
    @ApiBearerAuth()
    createAccount(@Body() createUser: CreateUserDto, @Token() token) {
        const user = this.authService.verify(token);
        return this.userService.createUser(createUser, user);
    }

    //@Roles("admon")
    //@UseGuards(JwtAuthGuard)
    @Get('test')
    async test(@Token() token) {
        console.log(token, "token ");
        return this.authService.verify(token);

    }

    @Post('confirmation-code')
    async confirmationCode(@Token() token, @Body() code: string) {
        const user = this.authService.verify(token);
        if (await this.userService.confirmationCode(user.id, code)) {
            return await this.authService.generateToken({id: user.id, roles: ["user"]});
        }
        return false;
    }

    @Post('password-reset')
    async passwordReset() {
        return await this.userService.passwordReset();
    }

}
