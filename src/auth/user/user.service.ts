import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../../schemas/users";
import {Model} from "mongoose";
import {Email} from "../../class/mail";
import {Session, SessionDocument} from "../../schemas/session";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
        private readonly email: Email
    ) {
    }

    /**
     * Создает нового пользователя если нет токена.
     */
    async newUser(){
       const user = await new this.userModel({roles: ['newUser']});
       await user.save();
       const session = await new this.sessionModel({user: user._id, numberUpdate: 0});
       await session.save();
       return {id: user._id, roles: ['newUser'], session: session._id, numberUpdate: session.numberUpdate};
    }

    /**
     * Регестрирует нового пользователя.
     * @param createUser
     */
    async createUser(createUser: CreateUserDto, user: string){
        const emailCode = Math.random().toString(36).substring(9);
        const newUser = new this.userModel({
          ...createUser, roles: ["mailCheck"], code: emailCode
        });
        await newUser.save();
        return await this.email.sendEmail('Код активации: ' + emailCode, createUser.email);
    }
    async confirmationCode(id: string, code: string){
        const emailCode = Math.random().toString(36).substring(9);
        const user = await this.userModel.findOneAndUpdate({_id: id, code: code}, {roles: ["user"]});
        return user[0].code == code;
    }
    async passwordReset(){
        return ""
    }
}
