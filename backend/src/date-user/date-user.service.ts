import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateUser } from '../schemas/dateUser.schema';

@Injectable()
export class DateUserService {
  constructor(
    @InjectModel(DateUser.name) private readonly dateUserModel: Model<DateUser>,
  ) {}

  async findAll(): Promise<DateUser[]> {
    return this.dateUserModel.find().exec();
  }

  async create(data: Partial<DateUser>): Promise<DateUser> {
    const created = new this.dateUserModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<DateUser>): Promise<DateUser> {
    const updated = await this.dateUserModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`DateUser with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.dateUserModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`DateUser with ID ${id} not found`);
    }
  }
} 