import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from '../schemas/testimonial.schema';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name) private readonly testimonialModel: Model<Testimonial>,
  ) {}

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialModel.find().exec();
  }

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    const created = new this.testimonialModel(data);
    return created.save();
  }
} 