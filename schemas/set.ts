import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SetDocument = Document & SetSchemaClass;

@Schema()
export class FlashCardSchema {
    @Prop()
    meaning: string

    @Prop()
    term: string
}

@Schema()
export class SetSchemaClass {
    @Prop({ required : true })
    name : string

    @Prop({ required : true, type: [FlashCardSchema] })
    set : FlashCardSchema[]
}

export const SetSchema = SchemaFactory.createForClass(SetSchemaClass);
