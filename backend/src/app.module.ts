import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../config';
import { ProductsModule } from './products/products.module';
import { CoursesModule } from './courses/courses.module';
import { RepairsModule } from './repairs/repairs.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ContactsModule } from './contacts/contacts.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CoursesModule,
    RepairsModule,
    TestimonialsModule,
    ContactsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}