import {createTransport} from "nodemailer";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
@Injectable()
export class Email {
    public async sendEmail(message: string, emailTo: string) {
        const transporter = createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'petechka-petrov-1993@internet.ru',
                pass: '7mD5w96x01m0ZuKTe1hp'
            }
        });
        try {
            await transporter.sendMail({
                from: 'petechka-petrov-1993@internet.ru',
                to: emailTo,
                subject: 'Активация аккаунта',
                text: message
            });
            return 'ok';
        } catch (e) {
            throw new HttpException([{
                message: 'Неудалось отправить сообщение, проверьте правильность написания почты',
                errorField: "email"
            }], HttpStatus.BAD_REQUEST);
        }
    }
}