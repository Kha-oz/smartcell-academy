import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '../schemas/course.schema';

@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    try {
      return await this.coursesService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener cursos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() courseData: Partial<Course>): Promise<Course> {
    try {
      return await this.coursesService.create(courseData);
    } catch (error) {
      throw new HttpException('Error al crear curso', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() courseData: Partial<Course>): Promise<Course> {
    try {
      return await this.coursesService.update(id, courseData);
    } catch (error) {
      throw new HttpException('Error al actualizar curso', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.coursesService.delete(id);
      return { message: 'Curso eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar curso', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 