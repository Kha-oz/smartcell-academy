import { Injectable } from '@nestjs/common';
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
} 