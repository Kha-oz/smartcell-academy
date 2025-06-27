import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repair } from '../schemas/repair.schema';

@Injectable()
export class RepairsService {
  constructor(
    @InjectModel(Repair.name) private readonly repairModel: Model<Repair>,
  ) {}

  async findAll(): Promise<Repair[]> {
    return this.repairModel.find().exec();
  }

  async create(data: Partial<Repair>): Promise<Repair> {
    const created = new this.repairModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Repair>): Promise<Repair> {
    const updated = await this.repairModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Repair with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repairModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Repair with ID ${id} not found`);
    }
  }
} 