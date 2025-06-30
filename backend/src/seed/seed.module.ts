import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ProductsModule } from '../products/products.module';
import { CoursesModule } from '../courses/courses.module';
import { RepairsModule } from '../repairs/repairs.module';
import { TestimonialsModule } from '../testimonials/testimonials.module';
import { ContactsModule } from '../contacts/contacts.module';
import { DateUserModule } from '../date-user/date-user.module';

@Module({
  imports: [
    ProductsModule,
    CoursesModule,
    RepairsModule,
    TestimonialsModule,
    ContactsModule,
    DateUserModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {} 