import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  modality: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  level: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course); 