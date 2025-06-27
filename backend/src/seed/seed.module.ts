import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ProductsModule } from '../products/products.module';
import { CoursesModule } from '../courses/courses.module';
import { RepairsModule } from '../repairs/repairs.module';
import { TestimonialsModule } from '../testimonials/testimonials.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    ProductsModule,
    CoursesModule,
    RepairsModule,
    TestimonialsModule,
    ContactsModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {} 