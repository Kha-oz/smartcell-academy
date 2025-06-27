import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from '../schemas/contact.schema';

@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findAll(): Promise<Contact[]> {
    try {
      return await this.contactsService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener contactos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() contactData: Partial<Contact>): Promise<Contact> {
    try {
      return await this.contactsService.create(contactData);
    } catch (error) {
      throw new HttpException('Error al crear contacto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() contactData: Partial<Contact>): Promise<Contact> {
    try {
      return await this.contactsService.update(id, contactData);
    } catch (error) {
      throw new HttpException('Error al actualizar contacto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.contactsService.delete(id);
      return { message: 'Contacto eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar contacto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 