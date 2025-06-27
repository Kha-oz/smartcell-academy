import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairsService } from './repairs.service';
import { Repair, RepairSchema } from '../schemas/repair.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Repair.name, schema: RepairSchema }]),
  ],
  providers: [RepairsService],
  exports: [RepairsService],
})
export class RepairsModule {} 