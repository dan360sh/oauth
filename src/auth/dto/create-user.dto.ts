import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:"ivan", description: "имя"})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @ApiProperty({example:"qwerty123", description: "Пароль"})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
    @ApiProperty({example:"swqazxcd@gmail.com", description: "Email"})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

}