import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { Repair } from '../schemas/repair.schema';

@Controller('api/repairs')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @Get()
  async findAll(): Promise<Repair[]> {
    try {
      return await this.repairsService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener reparaciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() repairData: Partial<Repair>): Promise<Repair> {
    try {
      return await this.repairsService.create(repairData);
    } catch (error) {
      throw new HttpException('Error al crear reparación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() repairData: Partial<Repair>): Promise<Repair> {
    try {
      return await this.repairsService.update(id, repairData);
    } catch (error) {
      throw new HttpException('Error al actualizar reparación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.repairsService.delete(id);
      return { message: 'Reparación eliminada exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar reparación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 