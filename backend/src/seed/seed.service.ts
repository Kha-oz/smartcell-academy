import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CoursesService } from '../courses/courses.service';
import { RepairsService } from '../repairs/repairs.service';
import { TestimonialsService } from '../testimonials/testimonials.service';
import { ContactsService } from '../contacts/contacts.service';
import { DateUserService } from '../date-user/date-user.service';

import { products } from '../../seeds/products.seed';
import { courses } from '../../seeds/courses.seed';
import { repairs } from '../../seeds/repairs.seed';
import { testimonials } from '../../seeds/testimonials.seed';
import { contacts } from '../../seeds/contacts.seed';
import { dateUsersSeed } from '../../seeds/date-users.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    private readonly coursesService: CoursesService,
    private readonly repairsService: RepairsService,
    private readonly testimonialsService: TestimonialsService,
    private readonly contactsService: ContactsService,
    private readonly dateUserService: DateUserService,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
    await this.seedCourses();
    await this.seedRepairs();
    await this.seedTestimonials();
    await this.seedContacts();
    await this.seedDateUsers();
    // Puedes agregar seed de usuario admin si lo necesitas
  }

  private async seedProducts() {
    const existing = await this.productsService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Productos ya existen, saltando seed');
      return;
    }
    for (const product of products) {
      await this.productsService.create(product);
    }
    console.log('✅ Productos insertados correctamente');
  }

  private async seedCourses() {
    const existing = await this.coursesService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Cursos ya existen, saltando seed');
      return;
    }
    for (const course of courses) {
      await this.coursesService.create(course);
    }
    console.log('✅ Cursos insertados correctamente');
  }

  private async seedRepairs() {
    const existing = await this.repairsService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Reparaciones ya existen, saltando seed');
      return;
    }
    for (const repair of repairs) {
      await this.repairsService.create(repair);
    }
    console.log('✅ Reparaciones insertadas correctamente');
  }

  private async seedTestimonials() {
    const existing = await this.testimonialsService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Testimonios ya existen, saltando seed');
      return;
    }
    for (const testimonial of testimonials) {
      await this.testimonialsService.create(testimonial);
    }
    console.log('✅ Testimonios insertados correctamente');
  }

  private async seedContacts() {
    const existing = await this.contactsService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Contactos ya existen, saltando seed');
      return;
    }
    for (const contact of contacts) {
      await this.contactsService.create(contact);
    }
    console.log('✅ Contactos insertados correctamente');
  }

  private async seedDateUsers() {
    const existing = await this.dateUserService.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ DateUsers ya existen, saltando seed');
      return;
    }
    for (const dateUser of dateUsersSeed) {
      await this.dateUserService.create(dateUser);
    }
    console.log('✅ DateUsers insertados correctamente');
  }
} 