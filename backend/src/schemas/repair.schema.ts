import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepairDocument = Repair & Document;

@Schema()
export class Repair {
  @Prop({ required: true })
  service_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ type: [String], required: true })
  features: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 'General' })
  category: string;

  @Prop({ required: true, default: true })
  is_available: boolean;
}

export const RepairSchema = SchemaFactory.createForClass(Repair); 