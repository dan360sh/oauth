import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
export type SessionDocument = Session & Document;
@Schema()
export class Session{
    @Prop()
    user: string;
    @Prop()
    numberUpdate: number;
}
export const SessionSchema = SchemaFactory.createForClass(Session);