import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestimonialsService } from './testimonials.service';
import { Testimonial, TestimonialSchema } from '../schemas/testimonial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Testimonial.name, schema: TestimonialSchema }]),
  ],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {} 