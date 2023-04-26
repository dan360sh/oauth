import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

export class ValidationException extends HttpException {
    messages;

    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response
    }
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {
            const obj = plainToClass(metadata.metatype, value);
            const errors = await validate(obj);
            if (errors.length) {
                let messages = errors.map(err => {
                    return `${err.property} - ${Object.values(err.constraints).join(', ')}`
                })
                throw new ValidationException(messages)
            }
        }catch (e){
            return value;
        }
        return value;
    }

}