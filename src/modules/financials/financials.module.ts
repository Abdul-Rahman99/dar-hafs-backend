import { Module } from '@nestjs/common';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialsModule])],
  controllers: [FinancialsController],
  providers: [FinancialsService],
})
export class FinancialsModule {}
