import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data: Partial<Product>): Promise<Product> {
    const created = new this.productModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
} 