import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    const updated = await this.testimonialModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.testimonialModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
  }
} 