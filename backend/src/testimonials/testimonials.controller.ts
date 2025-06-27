import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { Testimonial } from '../schemas/testimonial.schema';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  async findAll(): Promise<Testimonial[]> {
    try {
      return await this.testimonialsService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener testimonios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() testimonialData: Partial<Testimonial>): Promise<Testimonial> {
    try {
      return await this.testimonialsService.create(testimonialData);
    } catch (error) {
      throw new HttpException('Error al crear testimonio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() testimonialData: Partial<Testimonial>): Promise<Testimonial> {
    try {
      return await this.testimonialsService.update(id, testimonialData);
    } catch (error) {
      throw new HttpException('Error al actualizar testimonio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.testimonialsService.delete(id);
      return { message: 'Testimonio eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar testimonio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 