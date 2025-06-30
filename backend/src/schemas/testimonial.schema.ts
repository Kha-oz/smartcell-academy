import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  image: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial); 