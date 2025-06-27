import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.schema';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    try {
      return await this.productsService.create(productData);
    } catch (error) {
      throw new HttpException('Error al crear producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product> {
    try {
      return await this.productsService.update(id, productData);
    } catch (error) {
      throw new HttpException('Error al actualizar producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.productsService.delete(id);
      return { message: 'Producto eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 