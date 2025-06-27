import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepairDocument = Repair & Document;

@Schema()
export class Repair {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  time: string;

  @Prop({ type: [String], required: true })
  features: string[];

  @Prop({ required: true })
  price: string;
}

export const RepairSchema = SchemaFactory.createForClass(Repair); 