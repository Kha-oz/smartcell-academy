import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DateUserService } from './date-user.service';
import { DateUserController } from './date-user.controller';
import { DateUser, DateUserSchema } from '../schemas/dateUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DateUser.name, schema: DateUserSchema }]),
  ],
  controllers: [DateUserController],
  providers: [DateUserService],
  exports: [DateUserService],
})
export class DateUserModule {} 