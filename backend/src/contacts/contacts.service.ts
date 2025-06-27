import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from '../schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const created = new this.contactModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Contact>): Promise<Contact> {
    const updated = await this.contactModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.contactModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
  }
} 