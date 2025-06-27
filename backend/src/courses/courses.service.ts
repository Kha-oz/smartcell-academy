import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async create(data: Partial<Course>): Promise<Course> {
    const created = new this.courseModel(data);
    return created.save();
  }
} 