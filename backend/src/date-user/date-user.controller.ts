import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DateUserService } from './date-user.service';
import { DateUser } from '../schemas/dateUser.schema';

@Controller('api/date-users')
export class DateUserController {
  constructor(private readonly dateUserService: DateUserService) {}

  @Get()
  async findAll(): Promise<DateUser[]> {
    try {
      return await this.dateUserService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener registros', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() data: Partial<DateUser>): Promise<DateUser> {
    try {
      return await this.dateUserService.create(data);
    } catch (error) {
      throw new HttpException('Error al crear registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<DateUser>): Promise<DateUser> {
    try {
      return await this.dateUserService.update(id, data);
    } catch (error) {
      throw new HttpException('Error al actualizar registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.dateUserService.delete(id);
      return { message: 'Registro eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 