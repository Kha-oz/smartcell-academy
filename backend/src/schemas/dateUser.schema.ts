import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DateUserDocument = DateUser & Document;

@Schema()
export class DateUser {
  @Prop({ required: true })
  service_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], required: true })
  features: string[];
}

export const DateUserSchema = SchemaFactory.createForClass(DateUser); 